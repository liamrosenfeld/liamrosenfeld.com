var indexes = {"app": 0, "experimental": 0};

function showSlide(prefix, index) {
  // Show Slide
  var slides = document.getElementsByClassName(prefix + "Slides");
  if (index >= slides.length) {
    indexes[prefix] = 0;
  } else if (index < 0) {
    indexes[prefix] = slides.length - 1;
  } else {
    indexes[prefix] = index;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[indexes[prefix]].style.display = "block";

  // Update Buttons
  var buttons = document.getElementsByClassName(prefix + "Button");
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].className.replace(" clickedButton", "");
  }
  buttons[indexes[prefix]].className += " clickedButton";
}

for (var section in indexes) {
  showSlide(section, 0);
}