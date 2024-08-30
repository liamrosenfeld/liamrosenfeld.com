---
title: "My Quest for the Apple Icon Shape"
date: 2021-10-12
tags: ["devlog"]
katex: true
---

One of my apps is Iconology. It helps developers by acting as a straightforward editor and exporter of icons.

When Big Sur was released, I wanted to add support for generating the new macOS icons because the rounding mask is not automatically applied like it is on iOS. I made something close enough for the immediate future; however, I wanted to eventually make it spot on.

That led to me going on a quest to find the shape of the Apple App Icon mask and recreating it for both the original corner radius and different corner radii[^1]. I'm excited to share what I tried, leaned, and made when solving that problem.

*Comparisons between the drawn shapes and the target image were done by overlaying the shape in front and behind the target image and then counting the total amount of pixels that peeks through in a 1024 by 1024 image. The code that does that is a modified version of my [Accelerate pixel counter from Image to ASCII Art](https://github.com/liamrosenfeld/Image-to-Ascii-Art/blob/c67f1240b76d2cfceb3751e874eec039ce68d73a/Shared/AsciiConverter/AsciiPalette.swift).*

## Rounded Rectangles

I started my search for the shape with the rounded rectangle function in CoreGraphics: [`CGPath(roundedRect:,cornerWidth:,cornerHeight:,transform:)`](https://developer.apple.com/documentation/coregraphics/cgpath/1411218-init).

That function creates a circular rounded rectangle (the standard type of rounded rectangle), which is obtained by replacing the corners of the rectangle with four quarter circles of a given radius.

Since this rounded rectangle takes in a corner radius in pixels, feeding in the same corner radius to rectangles of different scales will product vastly different shapes. Because of that, it is necessary to first find a general way to represent corner radii that has no dependance on the dimensions of the rectangle.

The way I decided to generalize it was handle rounding as a percent, where 0% is a square and 100% is a circle. Since the rounded rect is four quarter circles on the corners, the rectangle would be not rounded when the corner radius is 0 and fully rounded when the corner radius is equal to half of the width of the shape. Everything else is a percentage between the two.

That means the corner radius can be expressed as \\(r = \frac{pl}{200}\\) where \\(l\\) is the length of a side of the square and \\(p\\) is the percent.

We can then use that rounding percent wrapper to find the optimal rounding percentage for the Apple icon. We can quickly do that by just brute forcing through different percentages.

| Percent | Error |
|:--|:--|
| 44.0 | 1058 |
| 44.5 | 658 |
| 45.0 | 456 |
| 45.5 | 322 |
| 46.0 | 434 |

As you can see, while it gets closest at 45-46%, it never nails the shape.

After some research, I learned that circular rounded rectangles were used for pre iOS 7 icons. However, with iOS 7, Apple switched to using continuous cornered rounded rectangles.

### Why the Difference Matters

In analytical geometry and calculus, curvature is the rate of change of the tangent unit vector (the direction in which the curve is 'traveling') with respect to length along the curve. Sudden changes in curvature are visually jarring because it means that the curve suddenly changes direction.

Straight lines have a curvature of 0 and circles have a curvature of \\(1/r\\). So the curvature function of the circular rounded rectangle jumps between 0 for the sides and \\(1/r\\) for the corners. Those jump discontinuities mean that the function is not continuous, and therefore the transitions are more visually jarring than optimal.

Apple's icons, on the other hand, have a continuous curvature which gives them a smoother feel. That is explicitly stated inside of their [SwiftUI documentation](https://developer.apple.com/documentation/swiftui/roundedcornerstyle/continuous) for the rounding mode that matches the icon shape.

## Squircles

### Introduction

The second strategy I tried was to use a squircle as the mask because they have a similar shape to rounded rectangles but have a continuous curvature function.

Before going further, let's first cover what a squircle is. Squircles are a super-ellipse with an n value of 4. A super-ellipse is a curve with the following equation:

\\[|\frac{x-a}{r_x}|^n + |\frac{y-b}{r_y}|^n = 1\\]

### Implementation

To draw out a path for a squircle, we would need a parameterization of the function that has defined bounds. The polar parameterization fulfills that need.

\\[x=a|\cos \theta|^{2/n}\text{sgn}(\cos \theta) \newline
y=b|\sin \theta|^{2/n}\text{sgn}(\sin \theta) \newline
\theta\in[0,2\pi]\\]

That equation can be implemented in Swift to draw a CGPath in the shape.

```swift
func squircle(rect: CGRect, n: CGFloat) -> CGPath {
    // get squircle parameters from function parameters
    let halfWidth = rect.width / 2
    let halfHeight = rect.height / 2
    
    // generate path using polar equation
    let path = CGMutablePath()
    path.move(to: squircleEq(n: n, theta: 0, halfWidth: halfWidth, halfHeight: halfHeight))
    for theta in stride(from: 0.0, to: .pi * 2, by: .pi / 300) {
        path.addLine(to: squircleEq(n: n, theta: theta, halfWidth: halfWidth, halfHeight: halfHeight) + rect.origin)
    }
    return path
}

func squircleEq(n: Double, theta: Double, halfWidth: Double, halfHeight: Double) -> CGPoint {
    let thetaMod = theta.truncatingRemainder(dividingBy: .pi * 2)
    let cosSign: Double = {
        if thetaMod < .pi / 2 {
            return 1
        } else if thetaMod < .pi * (3/2) {
            return -1
        } else {
            return 1
        }
    }()
    let sinSign: Double = thetaMod < .pi ? 1 : -1
    let x = pow(abs(cos(theta)), 2/n) * halfWidth * cosSign + halfWidth
    let y = pow(abs(sin(theta)), 2/n) * halfHeight * sinSign + halfHeight
    return CGPoint(x: x, y: y)
}
```

### Result

We can then try multiple different values of n and see which works best.[^2]

| n Value | Error |
|:--|:--|
| 4 | 16417 |
| 5 | 1619 |
| 5.2 | 1365 |
| 6 | 5398 |

After initial tests, it became clear that while the squircle *feels* in the right direction visually (because of the continuous curvature), it objectively is not.

## Back to Bézier

After more research, it seems like the discrepancies between the squircle and the target is likely because the apple icons are an approximation of a squircle using a limited number of bezier curves.

That realization changed the direction my testing was going. Instead of trying to find an equation for the path, I could reverse engineer the bézier curves.

On iOS, the [`UIBezierPath(roundedRect:, cornerRadius:)`](https://developer.apple.com/documentation/uikit/uibezierpath/1624356-init) function  produces a continuously cornered rounded rectangle. That is exactly what we need. However, Iconology needs that function on macOS, so recreating it there is necessary.

The function outputs a path made of line segments and cubic bézier curves. That makes it pretty straightforward to save the output and reuse it (even with scaling). However, that would not satisfy one of the starting goals of this endeavor: using the same shape with multiple different corner radii. To achieve that, more needed to be done.

After a brief stint of trying to use a trial of the hopper disassembler and to figure out how the `_continuousRoundedRectBezierPath` function in UIKit works, I decided it would be a lot more doable to recreate it through observing the behavior.

### Observations

Since the iOS coordinate system has its origin in the top left corner of the screen, I started my observations there. That is because points near that corner would have the least dependance on the dimensions of the rectangle.

After observing the effects of changing the corner radius and dimensions, I found that the points near the top left corner only depended on corner radius. That means each point can be represented relative to the corner it is nearest using only the corner radius and two constants.

That means each point within a quadrant can be expressed mathematically as:

* Top Left: \\((ur,\ vr)\\)
* Top Right: \\((w - ur,\ vr)\\)
* Bottom Right: \\((w - ur,\ h - vr)\\)
* Bottom Left: \\((ur,\ h - vr)\\)

Where u and v are constants unique to each point.

### Reversing

To get those constants for each point (including control points) in the curve, we can take the UIBezierPath and feed each point of each component through the inverse for the corner it is closest. That removes dependency on both the dimensions and the corner radius.

* Top Left: \\(u = \frac{x}{r}, \ v = \frac{y}{r}\\)
* Top Right: \\(u = \frac{w-x}{r}, \ v = \frac{y}{r}\\)
* Bottom Right: \\(u = \frac{w-x}{r}, \ v = \frac{h-y}{r}\\)
* Bottom Left: \\(u = \frac{x}{r}, \ v = \frac{h-y}{r}\\)

We can then use those constants by generating code that feeds them into the helper function for their quadrant to reintroduce dependency on the new dimensions and corner radius and uses that point in the element of the curve.

The UIBezierPath we are trying to recreate only has three element types: `moveToPoint`, `addLineToPoint`, and `addCurveToPoint`. Those can be recreated using `path.move(to:)`, `path.addLine(to:)`, and `path.addCurve(to:control1:control2:)` respectively.

When those elements are put together, this is what we get:

```swift
import SwiftUI
import UIKit
import PlaygroundSupport

// -- Properties --
// These values can be whatever, dependency on them is removed by relativePt
let rect = CGRect(x: 0, y: 0, width: 500, height: 500)
let cornerRadius: CGFloat = 100

// -- Code Generation --
extension CGFloat {
    func rounded(to pts: Int) -> CGFloat {
        return (self * (pow(10, CGFloat(pts)))).rounded() / pow(10, CGFloat(pts))
    }
}
extension CGPoint {
    var funcCall: String {
        "(x: \(x.rounded(to: 8)), y: \(y.rounded(to: 8)))"
    }
}

enum Quadrant: String {
    case topLeft
    case topRight
    case btmRight
    case btmLeft
    
    // finds the constants for the helper function
    // removes dependency on dimensions and corner radius
    func relativePt(_ point: CGPoint) -> CGPoint {
        let x = point.x
        let y = point.y
        let w = rect.size.width
        let h = rect.size.height
        let r = cornerRadius
        
        switch self {
        case .topLeft:
            return .init(x: x / r, y: y / r)
        case .topRight:
            return .init(x: (w - x) / r, y: y / r)
        case .btmRight:
            return .init(x: (w - x) / r, y: (h - y) / r)
        case .btmLeft:
            return .init(x: x / r, y: (h - y) / r)
        }
    }
}

func generateDynamicCode(for path: CGPath) {
    path.applyWithBlock { elementPtr in
        let element = elementPtr.pointee
        
        // find the quadrant that the point is in
        // allows us to know which point helper function to use
        let quad: Quadrant = {
            let x = element.points[0].x
            let y = element.points[0].y
            if (x < rect.width / 2) && (y < rect.height / 2){
                return .topLeft
            } else if (x > rect.width / 2) && (y < rect.height / 2){
                return .topRight
            } else if (x > rect.width / 2) && (y > rect.height / 2){
                return .btmLeft
            } else {
                return .btmLeft
            }
        }()
        
        // print out the code to create the component
        // from the unique constants and the helper function
        switch element.type {
        case .moveToPoint:
            print("path.move(to: \(quad)\(quad.relativePt(element.points[0]).funcCall))")
        case .addLineToPoint:
            print("path.addLine(to: \(quad)\(quad.relativePt(element.points[0]).funcCall))")
        case .addCurveToPoint:
            print("""
                path.addCurve(
                    to: \(quad)\(quad.relativePt(element.points[2]).funcCall),
                    control1: \(quad)\(quad.relativePt(element.points[0]).funcCall),
                    control2: \(quad)\(quad.relativePt(element.points[1]).funcCall)
                )
                """)
        default:
            print("Did not add case")
        }
    }
}

// -- Running It --
let path = UIBezierPath(roundedRect: rect, cornerRadius: cornerRadius).cgPath
generateDynamicCode(for: path)
```

This generates the following code which can run on macOS[^3] to generate a continuously cornered rounded rectangle CGPath from a bounding rectangle and corner radius.

```swift
// the helper functions
func topLeft(x: CGFloat, y: CGFloat) -> CGPoint {
    CGPoint(
        x: rect.origin.x + (x * cornerRadius),
        y: rect.origin.y + (y * cornerRadius)
    )
}
func topRight(x: CGFloat, y: CGFloat) -> CGPoint {
    CGPoint(
        x: rect.origin.x + rect.size.width - (x * cornerRadius),
        y: rect.origin.y + (y * cornerRadius)
    )
}
func btmRight(x: CGFloat, y: CGFloat) -> CGPoint {
    CGPoint(
        x: rect.origin.x + rect.size.width - (x * cornerRadius),
        y: rect.origin.y + rect.size.height - (y * cornerRadius)
    )
}
func btmLeft(x: CGFloat, y: CGFloat) -> CGPoint {
    CGPoint(
        x: rect.origin.x + (x * cornerRadius),
        y: rect.origin.y + rect.size.height - (y * cornerRadius)
    )
}
    
// make the path
let path = CGMutablePath()
path.move(to: topLeft(x: 1.528665, y: 0.0))
path.addLine(to: topRight(x: 1.528665, y: 0.0))
path.addCurve(
    to: topRight(x: 0.63149379, y: 0.07491139),
    control1: topRight(x: 1.08849296, y: 0.0),
    control2: topRight(x: 0.86840694, y: 0.0)
)
path.addLine(to: topRight(x: 0.63149379, y: 0.07491139))
path.addCurve(
    to: topRight(x: 0.07491139, y: 0.63149379),
    control1: topRight(x: 0.37282383, y: 0.16905956),
    control2: topRight(x: 0.16905956, y: 0.37282383)
)
path.addCurve(
    to: topRight(x: 0.0, y: 1.52866498),
    control1: topRight(x: 0.0, y: 0.86840694),
    control2: topRight(x: 0.0, y: 1.08849296)
)
path.addLine(to: btmRight(x: 0.0, y: 1.528665))
path.addCurve(
    to: btmRight(x: 0.07491139, y: 0.63149379),
    control1: btmRight(x: 0.0, y: 1.08849296),
    control2: btmRight(x: 0.0, y: 0.86840694)
)
path.addLine(to: btmRight(x: 0.07491139, y: 0.63149379))
path.addCurve(
    to: btmRight(x: 0.63149379, y: 0.07491139),
    control1: btmRight(x: 0.16905956, y: 0.37282383),
    control2: btmRight(x: 0.37282383, y: 0.16905956)
)
path.addCurve(
    to: btmRight(x: 1.52866498, y: 0.0),
    control1: btmRight(x: 0.86840694, y: 0.0),
    control2: btmRight(x: 1.08849296, y: 0.0)
)
path.addLine(to: btmLeft(x: 1.528665, y: 0.0))
path.addCurve(
    to: btmLeft(x: 0.63149379, y: 0.07491139),
    control1: btmLeft(x: 1.08849296, y: 0.0),
    control2: btmLeft(x: 0.86840694, y: 0.0)
)
path.addLine(to: btmLeft(x: 0.63149379, y: 0.07491139))
path.addCurve(
    to: btmLeft(x: 0.07491139, y: 0.63149379),
    control1: btmLeft(x: 0.37282383, y: 0.16905956),
    control2: btmLeft(x: 0.16905956, y: 0.37282383)
)
path.addCurve(
    to: btmLeft(x: 0.0, y: 1.52866498),
    control1: btmLeft(x: 0.0, y: 0.86840694),
    control2: btmLeft(x: 0.0, y: 1.08849296)
)
path.addLine(to: topLeft(x: 0.0, y: 1.528665))
path.addCurve(
    to: topLeft(x: 0.07491139, y: 0.63149379),
    control1: topLeft(x: 0.0, y: 1.08849296),
    control2: topLeft(x: 0.0, y: 0.86840694)
)
path.addLine(to: topLeft(x: 0.07491139, y: 0.63149379))
path.addCurve(
    to: topLeft(x: 0.63149379, y: 0.07491139),
    control1: topLeft(x: 0.16905956, y: 0.37282383),
    control2: topLeft(x: 0.37282383, y: 0.16905956)
)
path.addCurve(
    to: topLeft(x: 1.52866498, y: 0.0),
    control1: topLeft(x: 0.86840694, y: 0.0),
    control2: topLeft(x: 1.08849296, y: 0.0)
)
path.closeSubpath()
```

### Results

While those aren't pretty numbers, they work. When this new shape was popped into the tester it nailed the desired shape.

| Shape | Attribute | Error (px) |
|:--|:--|:--|
| Circular Rounded Rect | r = 45.5% | 322 |
| Squircle | n = 5.2 | 1365 |
| Continuous Rounded Rect | r = 45% | **0** |

## Takeaways

I am really happy with how this went. I learned a lot along the way and it was a lot of fun chasing the solution. It was also a nice surprise that my multivariable calculus class set off the lightbulb of continuous curvature.

After working with squircles for a bit, I had hoped there would an elegant equation for the icon as if it was a squircle (the bézier curves do have an equation but it would be a beast of a piecewise parametric one). While that would have been satisfying, I'm happy that I eventually did figure out a solution even if it includes some ugly constants.

I think this is a testament to sweating the details. While large parts of this endeavor could very well qualify as yak-shaving, I felt that it ultimately paid off for Iconology. Iconology can now generate icons exactly like the given macOS template, and the work put into squircles isn't going to waste because they are being added as an additional feature.

[^1]: It also couldn't be a mask created by rasterizing a continuously curved CALayer because I needed to draw shadows along the curve
[^2]: While values of n not equal to 4 technically isn't a squircle, it seems to be common to still call super-ellipses of n values that are close enough to 4 squircles—possibly because squircle is just a fun word to say.
[^3]: The helper function naming is representative of the purpose they serve in the iOS curve. Technically their names should be swapped on macOS because the origin is on the bottom left.
