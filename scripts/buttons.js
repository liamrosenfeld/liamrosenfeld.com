let indexes = { "app": -1, "experimental": -1 };

function showSlide(prefix, index) {
  // get slides
  let slides = document.getElementsByClassName(prefix + "Slides");

  // return if already selected
  if (index == indexes[prefix]) {
    return;
  }

  // figure out animation for slide
  const inAnimation = (index < indexes[prefix]) ? "fadeInLeft" : "fadeInRight";
  const outAnimation = (index > indexes[prefix]) ? "fadeOutLeft" : "fadeOutRight";

  // update index
  const origIndex = indexes[prefix];
  indexes[prefix] = index;

  // animate slides
  animate(slides[origIndex], outAnimation, () => {
    // hide old slide
    slides[origIndex].style.display = "none";

    // show new slide
    let slide = slides[index];
    animate(slide, inAnimation);
    slide.style.display = "block";
  });

  // update buttons
  let buttons = document.getElementsByClassName(prefix + "Button");
  buttons[origIndex].classList.remove("clickedButton");
  buttons[index].classList.add("clickedButton");
}

function animate(element, animationName, callback) {
  element.classList.add("animated", animationName);
  element.style["animation-duration"] = "0.35s";

  function handleAnimationEnd() {
    element.classList.remove("animated", animationName);
    element.removeEventListener("animationend", handleAnimationEnd);

    if (typeof callback === "function") {
      callback();
    }
  }

  element.addEventListener("animationend", handleAnimationEnd);
}

function setup(prefix) {
  // get slides
  var slides = document.getElementsByClassName(prefix + "Slides");

  // hide all
  for (let slide of slides) {
    slide.classList = [slide.classList[0]];
    slide.style.display = "none";
  }

  // update index
  index = 0;
  indexes[prefix] = index;

  // show first slide
  const slide = slides[0];
  slide.style.display = "block";

  // select first button
  var buttons = document.getElementsByClassName(prefix + "Button");
  buttons[0].classList.add("clickedButton");
}

function resetSlides() {
  // show first slide for every section
  for (let section in indexes) {
    setup(section);
  }
}

resetSlides();