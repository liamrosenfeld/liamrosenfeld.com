// App Slides
var appSlideIndex = 1;
showAppDivs(appSlideIndex);

function plusAppDivs(n) {
  showAppDivs(appSlideIndex += n);
}

function currentAppDiv(n) {
  showAppDivs(appSlideIndex = n);
}

function showAppDivs(n) {
  var i;
  var x = document.getElementsByClassName("appSlides");
  var appDots = document.getElementsByClassName("appButton");
  if (n > x.length) {
    appSlideIndex = 1
  }
  if (n < 1) {
    appSlideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < appDots.length; i++) {
    appDots[i].className = appDots[i].className.replace(" clickedButton", "");
  }
  x[appSlideIndex - 1].style.display = "block";
  appDots[appSlideIndex - 1].className += " clickedButton";
}

// Website Slides
var webSlideIndex = 1;
showWebDivs(webSlideIndex);

function plusWebDivs(m) {
  showWebDivs(webSlideIndex += m);
}

function currentWebDiv(m) {
  showWebDivs(webSlideIndex = m);
}

function showWebDivs(m) {
  var j;
  var y = document.getElementsByClassName("webSlides");
  var webDots = document.getElementsByClassName("webButton");
  if (m > y.length) {
    webSlideIndex = 1
  }
  if (m < 1) {
    webSlideIndex = y.length
  }
  for (j = 0; j < y.length; j++) {
    y[j].style.display = "none";
  }
  for (j = 0; j < webDots.length; j++) {
    webDots[j].className = webDots[j].className.replace(" clickedButton", "");
  }
  y[webSlideIndex - 1].style.display = "block";
  webDots[webSlideIndex - 1].className += " clickedButton";
}
