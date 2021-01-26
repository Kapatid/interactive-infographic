const Logo = document.querySelector("#logo");
const MenuBurger = document.querySelector("#menu-burger");
const MainBody = document.querySelector("#main-body");

var blue = "#253680";
var yellow = "#F9D552";
var white = "#F5F5F5";

var countryBallsAnimated = false;
var mapTitleAnimated = false;

var currentCountryInfoPage;

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
document.querySelectorAll(".btn-back-map").forEach((item) => {
  item.addEventListener("click", (event) => {
    anime({
      targets: "#container-countries",
      translateX: [0, "100%"],
      easing: "cubicBezier(.5, .05, .5, .5)",
      duration: 600,
      complete: function (anim) {
        document.getElementById("container-countries").style.visibility =
          "hidden";
        document.querySelector("#group3").scrollIntoView({
          behavior: "smooth",
        });
      },
    });
  });
});

document.querySelectorAll(".btn-overview").forEach((item) => {
  item.addEventListener("click", (btn) => {
    var elem = btn.target.parentElement.parentElement.previousElementSibling;

    setContent(elem, 0);
  });
});

document.querySelectorAll(".btn-food").forEach((item) => {
  item.addEventListener("click", (btn) => {
    var elem = btn.target.parentElement.parentElement.previousElementSibling;

    setContent(elem, 1);
  });
});

function setContent(el, showContent) {
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

  contentDivs.forEach((item) => {
    let foundElem = el.getElementsByClassName(item)[0];

    foundElem.style.display = "none";
  });

  el.getElementsByClassName(contentDivs[showContent])[0].style.display = "grid";
}

/* ----------- MAPS ----------- */
/**
 * AMCHARTS
 * Link: https://www.amcharts.com/
 *
 * Customized by: Nadji Tan
 *
 */
am4core.ready(function () {
  // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);

  // Set map definition
  chart.geodata = am4geodata_worldLow;
  chart.background.fill = am4core.color(yellow);
  chart.background.fillOpacity = 1;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Center on the groups by default
  chart.homeZoomLevel = 0;
  chart.homeGeoPoint = { longitude: 117, latitude: 9.2 };

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipHTML =
    '<div style="text-align:center; color:#253680;"> <h3 style="font-weight:400; text-transform: uppercase;"> {name} </h3> <p style="font-style:italic; font-size:0.8rem;"> {subtext} </p> </div>';
  polygonTemplate.stroke = am4core.color(yellow);

  // Create hover state and set alternative fill color
  var country = polygonTemplate.states.create("hover");
  country.properties.fill = am4core.color(white);

  var btnContainer = chart.createChild(am4core.Container);
  btnContainer.shouldClone = false;
  btnContainer.align = "right";
  btnContainer.valign = "top";
  //btnContainer.zIndex = Number.MAX_SAFE_INTEGER;
  btnContainer.marginTop = 10;
  btnContainer.marginRight = 20;

  //var homeButton = btnContainer.createChild(am4core.Button);
  var homeButton = new am4core.Button();
  homeButton.events.on("hit", function () {
    chart.goHome();
  });

  homeButton.icon = new am4core.Sprite();
  homeButton.padding(7, 5, 7, 5);
  homeButton.width = 30;
  homeButton.scale = 1.5;
  homeButton.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  homeButton.icon.path =
    "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  homeButton.fill = blue;
  homeButton.parent = chart;
  homeButton.align = "right";
  homeButton.valign = "bottom";
  homeButton.marginBottom = 20;
  homeButton.marginRight = 25;
  //homeButton.insertBefore(chart.zoomControl.plusButton);

  // Zoom control
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.parent = btnContainer;
  chart.zoomControl.scale = 1.2;
  chart.zoomControl.stroke = blue;
  chart.zoomControl.slider.height = 70;
  chart.zoomControl.slider.stroke = white;
  chart.zoomControl.cursorOverStyle = am4core.MouseCursorStyle.pointer;

  var excludedCountries = ["AQ"];

  // Add some data
  polygonSeries.data = [
    {
      title: "Brunei", // Custom data. Different from name
      subtext: "A Kingdom of Unexpected Treasures",
      fill: blue,
      id: "BN", // With polygonSeries.useGeodata = true, it will try and match this id, then apply the other properties as custom data
      //customData: "1995",
    },
    {
      title: "Cambodia",
      subtext: "Kingdom of Wonder",
      fill: blue,
      id: "KH",
    },
    {
      title: "Indonesia",
      subtext: "Wonderful Indonesia",
      fill: blue,
      id: "ID",
    },
    {
      title: "Lao",
      subtext: "Simply Beautiful",
      fill: blue,
      id: "LA",
    },
    {
      title: "Malaysia",
      subtext: "Truly Asia",
      fill: blue,
      id: "MY",
    },
    {
      title: "Myanmar",
      subtext: "Be Enchanted",
      fill: blue,
      id: "MM",
    },
    {
      title: "Philippines",
      subtext: "It's More Fun in the Philippines",
      fill: blue,
      id: "PH",
    },
    {
      title: "Singapore",
      subtext: "Passion Made Possible",
      fill: blue,
      id: "SG",
    },
    {
      title: "Thailand",
      subtext: "Amazing Thailand",
      fill: blue,
      id: "TH",
    },
    {
      title: "Vietnam",
      subtext: "Timeless Charm",
      fill: blue,
      id: "VN",
    },
  ];

  var includedCountries = [];
  polygonSeries.data.forEach(function (country) {
    includedCountries.push(country.id);
    excludedCountries.push(country.id);
  });
  polygonSeries.include = includedCountries;

  // // The rest of the world.
  // var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
  // var worldSeriesName = "world";
  // worldSeries.name = worldSeriesName;
  // worldSeries.useGeodata = true;
  // worldSeries.exclude = excludedCountries;
  // worldSeries.fillOpacity = 1;
  // worldSeries.hiddenInLegend = true;
  // worldSeries.mapPolygons.template.nonScalingStroke = true;

  // Bind "fill" property to "fill" key in data
  polygonTemplate.propertyFields.fill = "fill";

  polygonTemplate.events.on("hit", function (ev) {
    ev.target.series.chart.zoomToMapObject(ev.target);
    console.log(ev.target.dataItem.dataContext.name);
  });
});
