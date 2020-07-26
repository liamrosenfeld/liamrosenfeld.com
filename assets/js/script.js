// Sticky Menu
window.onscroll = () => {
  let nav = document.getElementById("navbar");
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
};
