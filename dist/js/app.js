const Logo = document.querySelector("#logo");
const MenuBurger = document.querySelector("#menu-burger");
const MainBody = document.querySelector("#main-body");

var tl = anime.timeline({
  easing: "easeOutCubic",
  duration: 500,
});

// tl.add({
//   targets: "#logo",
//   translateX: 250,
//   opacity: [0, 1],
//   direction: "reverse",
// }).add(
//   {
//     targets: "#menu-burger",
//     translateX: 250,
//     opacity: [0, 1],
//     direction: "reverse",
//   },
//   "-=250"
// );

anime({
  targets: "#logo",
  translateX: 50,
  opacity: 0,
  direction: "reverse",
  easing: "linear",
  duration: 400,
});
anime({
  targets: "#menu-burger",
  translateX: 50,
  opacity: 0,
  direction: "reverse",
  easing: "linear",
  duration: 400,
});
