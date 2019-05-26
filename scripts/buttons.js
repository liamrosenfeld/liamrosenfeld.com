var indexes = {"app": -1, "experimental": -1};

function showSlide(prefix, index) {
  // return if already selected
  if (indexes[prefix] < 0) {
    index = 0;
  } else if (index == indexes[prefix]) {
    return;
  } else {
    // get animation for slide
    var animation = (index < indexes[prefix]) ? "fadeInLeft" : "fadeInRight";
  }
  console.log(animation);
  // Get Slides
  var slides = document.getElementsByClassName(prefix + "Slides");

  // Update Index
  const origIndex = indexes[prefix];
  indexes[prefix] = index;

  // Hide All Slides
  for (let slide of slides) {
    slide.classList = [slide.classList[0]];
    slide.style.display = "none";
  }

  // show slide
  var slide = slides[indexes[prefix]];
  slide.classList.add("animated", animation);
  slide.style.display = "block";

  // Update Buttons
  var buttons = document.getElementsByClassName(prefix + "Button");
  if (origIndex >= 0) {
    buttons[origIndex].classList.remove("clickedButton");
  }
  buttons[indexes[prefix]].classList.add("clickedButton");
}

function resetSlides() {
  // show first slide for every section
  for (let section in indexes) {
    showSlide(section, 0);
  }
}

resetSlides();