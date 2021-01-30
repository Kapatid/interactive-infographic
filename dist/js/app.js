var blue = "#253680";
var yellow = "#F9D552";
var white = "#F5F5F5";

var countryBallsAnimated = false;
var mapTitleAnimated = false;

/* ----------- HOME PAGE EVENTS / ANIMATIONS ----------- */
document
  .getElementsByClassName("home-btn-1")[0]
  .addEventListener("click", function (event) {
    document.querySelector("#group2").scrollIntoView({
      behavior: "smooth",
    });
  });
document
  .getElementsByClassName("home-btn-2")[0]
  .addEventListener("click", function (event) {
    document.querySelector("#group3").scrollIntoView({
      behavior: "smooth",
    });
  });

// console.log("Group 2 TOP: " + document.querySelector("#group2").offsetTop);
// console.log(
//   "Group 2 BOTTOM: " +
//     document.querySelector("#group2").offsetTop +
//     document.querySelector("#group2").offsetHeight
// );
// console.log("Group 3 TOP: " + document.querySelector("#group3").offsetTop);
// console.log(
//   "Group 3 BOTTOM: " +
//     document.querySelector("#group3").offsetTop +
//     document.querySelector("#group3").offsetHeight
// );

/* ----------- HIDE BEFORE ANIMATING ----------- */
anime({
  targets: ".country-balls1 img",
  opacity: 0,
});
anime({
  targets: ".country-text",
  opacity: 0,
});
anime({
  targets: ".country-balls2 img",
  opacity: 0,
});
anime({
  targets: "#map-title",
  opacity: 0,
});

/* ----------- START ANIMATIONS ON SCROLL ----------- */
document
  .getElementsByClassName("parallax")[0]
  .addEventListener("scroll", function () {
    let currentScroll = document.getElementsByClassName("parallax")[0]
      .scrollTop;

    if (currentScroll >= 794 && countryBallsAnimated == false) {
      anime({
        targets: ".country-balls1 img",
        opacity: [0, 1],
        translateX: [-100, 0],
        delay: anime.stagger(150),
      });

      anime({
        targets: ".country-text",
        opacity: [0, 1],
        translateY: [50, 0],
        easing: "spring(1, 80, 10, 0)",
      });

      anime({
        targets: ".country-balls2 img",
        opacity: [0, 1],
        translateX: [100, 0],
        delay: anime.stagger(150),
      });

      countryBallsAnimated = true;
    }

    if (currentScroll >= 1588 && mapTitleAnimated == false) {
      anime({
        targets: "#map h1",
        opacity: [0, 1],
        translateY: [-100, 0],
        delay: anime.stagger(50),
      });

      mapTitleAnimated = true;
    }

    // console.log(document.getElementsByClassName("parallax")[0].scrollTop); // KNOW THE CURRENT SCROLL
  });

/* ----------- COUNTRY PAGE EVENTS / ANIMATIONS ----------- */
var changePage = true;
// Set the corresponding page to each navbar button
addEventToBtn(".btn-overview", 0);
addEventToBtn(".btn-food", 1);
addEventToBtn(".btn-religion", 2);
addEventToBtn(".btn-famous-bldgs", 3);
addEventToBtn(".btn-arts", 4);
addEventToBtn(".btn-holidays", 5);
addEventToBtn(".btn-festivals", 6);
addEventToBtn(".btn-superstition", 7);
addEventToBtn(".btn-commute", 8);
addEventToBtn(".btn-language", 9);
addEventToBtn(".btn-infrastructure", 10);

function addEventToBtn(elName, elNum) {
  document.querySelectorAll(elName).forEach((item) => {
    item.addEventListener("click", (btn) => {
      if (changePage == true) {
        // Avoid sudden page change
        getContents(btn.target, elNum); // Add animations to page
        buttonStyle(btn.target); // Style button
      }
    });
  });
}

function buttonStyle(btn) {
  if (previousCountryInfoPage == null) {
    previousCountryInfoPage = btn.parentElement.getElementsByClassName(
      "active-btn-navbar"
    )[0];
  }

  btn.classList.add("active-btn-navbar");

  if (btn != previousCountryInfoPage) {
    previousCountryInfoPage.classList.remove("active-btn-navbar");

    previousCountryInfoPage = btn;
  }
}

function getContents(el, showContent) {
  let contentDivs = [
    "content-overview",
    "content-food",
    "content-religion",
    "content-famous-bldgs",
    "content-arts",
    "content-holidays",
    "content-festivals",
    "content-superstition",
    "content-commute",
    "content-language",
    "content-infrastructure",
  ];

  var foundElem = el.parentElement.previousElementSibling;

  // Target info page of country
  foundElem.getElementsByClassName(contentDivs[showContent])[0].style.display =
    "grid";

  anime({
    targets: foundElem.getElementsByClassName(contentDivs[showContent])[0],
    left: ["100%", 0],
    easing: "cubicBezier(.5, .05, .5, .5)",
    duration: 500,
    begin: function (anim) {
      changePage = false;

      // Previous info pages of country
      contentDivs.forEach((item) => {
        $(foundElem.getElementsByClassName(item)).css({ "z-index": 1 });

        if (
          item !=
          foundElem
            .getElementsByClassName(contentDivs[showContent])[0]
            .className.split(" ")[0]
        ) {
          setTimeout(function () {
            foundElem.getElementsByClassName(item)[0].style.display = "none";
          }, 500);
        }
      });

      // Target info page of country
      $(foundElem.getElementsByClassName(contentDivs[showContent])[0]).css({
        "z-index": 3,
      });

      splides.forEach((splide) => {
        splide.refresh();
      });
      primarySplide.forEach((splide) => {
        splide.refresh();
      });
      secondarySplide.forEach((splide) => {
        splide.refresh();
      });
    },
    complete: function () {
      changePage = true;
    },
  });
}

/**
 * FOLDER JS
 *
 * Author: Nadji Tan
 *
 */

document.getElementsByClassName("folder").forEach((folder) => {
  folder.firstElementChild.firstElementChild.style.cssText =
    "background-color: #f5f5f5; color: #253680;";
});

document.getElementsByClassName("folder").forEach((item) => {
  var previousFolderTab;

  item.getElementsByClassName("folder-tab").forEach((tab, index) => {
    tab.addEventListener("click", (btn) => {
      if (previousFolderTab != null) {
        previousFolderTab.style.cssText =
          "background-color: #253680; color: #f5f5f5;";
      } else {
        btn.target.parentElement.firstElementChild.style.cssText =
          "background-color: #253680; color: #f5f5f5;";
      }

      btn.target.style.cssText = "background-color: #f5f5f5; color: #253680;";

      item.getElementsByClassName("folder-content-body").forEach((body) => {
        body.style.display = "none";
      });

      item.getElementsByClassName("folder-content-body")[index].style.display =
        "grid";

      previousFolderTab = btn.target;
    });
  });
});
