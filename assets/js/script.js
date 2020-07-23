// Sticky Menu
window.onscroll = () => {
  let nav = document.getElementsByClassName("navigation")[0];
  if (window.scrollY > 100) {
    nav.classList.add('nav-bg');
  } else {
    nav.classList.remove('nav-bg');
  }
};
