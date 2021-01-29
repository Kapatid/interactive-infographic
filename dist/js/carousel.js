// var prevElem;
// var nextElem;

var splides = [];
var primarySplide = [];
var secondarySplide = [];

splide(".splide", ".secondary-slider", ".primary-slider");
splide(".splide-cambodia", ".secondary-cambodia", ".primary-cambodia");
splide(".splide-indonesia", ".secondary-indonesia", ".primary-indonesia");
splide(".splide-laos", ".secondary-laos", ".primary-laos");
splide(".splide-malaysia", ".secondary-malaysia", ".primary-malaysia");
splide(".splide-myanmar", ".secondary-myanmar", ".primary-myanmar");
splide(".splide-philippines", ".secondary-philippines", ".primary-philippines");
splide(".splide-singapore", ".secondary-singapore", ".primary-singapore");
splide(".splide-thailand", ".secondary-thailand", ".primary-thailand");
splide(".splide-vietnam", ".secondary-vietnam", ".primary-vietnam");

function splide(splideElem, secondSlide, primSlide) {
  var splide = new Splide(splideElem, {
    prev: "splide__arrow--prev",
    next: "splide__arrow--next",
    pagination: true,
    type: "slide",
    trimSpace: false,
    fixedWidth: 200,
    height: 200,
    drag: true,
    gap: 70,
    focus: "center",
    breakpoints: {
      600: {
        fixedWidth: 66,
        height: 40,
      },
    },
  }).mount();

  splide.on("active", function (slide) {
    $(slide.slide).addClass("isActive");
  });

  splide.on("inactive", function (slide) {
    $(slide.slide).removeClass("isActive");
  });

  splides.push(splide);

  var secondarySlider = new Splide(secondSlide, {
    prev: "splide__arrow--prev",
    next: "splide__arrow--next",
    pagination: true,
    type: "slide",
    trimSpace: false,
    drag: true,
    focus: "center",
    pagination: false,
    fixedWidth: 100,
    height: 60,
    gap: 10,
    cover: true,
    isNavigation: true,
    breakpoints: {
      600: {
        fixedWidth: 66,
        height: 40,
      },
    },
  }).mount();

  var primarySlider = new Splide(primSlide, {
    type: "fade",
    heightRatio: 0.5,
    pagination: false,
    arrows: false,
    cover: true,
  }); // do not call mount() here.

  primarySlider.sync(secondarySlider).mount();

  primarySplide.push(primarySlider);
  secondarySplide.push(secondarySlider);
}

// splide.on("pagination:updated", function (data, prevItem) {
//   console.log(data);
//   splide.on("active", function () {
//     $(prevElem).removeClass("prev-elem");
//     $(nextElem).removeClass("next-elem");

//     $(prevItem.Slides[0].slide).addClass("prev-elem");
//     prevElem = prevItem.Slides[0].slide;
//     nextElem = $(prevItem.Slides[0].slide).next().next().addClass("next-elem");
//   });
// });
