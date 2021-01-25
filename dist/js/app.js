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
  chart.background.fill = am4core.color("#aadaff");
  chart.background.fillOpacity = 1;

  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Center on the groups by default
  chart.homeZoomLevel = 0;
  chart.homeGeoPoint = { longitude: 117, latitude: 10 };

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipHTML = "{name} <br> <button>Hello</button>";
  polygonTemplate.fill = am4core.color("#74B266");

  // Create hover state and set alternative fill color
  var country = polygonTemplate.states.create("hover");
  country.properties.fill = am4core.color("#367B25");

  var btnContainer = chart.createChild(am4core.Container);
  btnContainer.shouldClone = false;
  btnContainer.align = "right";
  btnContainer.valign = "top";
  //btnContainer.zIndex = Number.MAX_SAFE_INTEGER;
  btnContainer.marginTop = 5;
  btnContainer.marginRight = 5;

  //var homeButton = btnContainer.createChild(am4core.Button);
  var homeButton = new am4core.Button();
  homeButton.events.on("hit", function () {
    chart.goHome();
  });

  homeButton.icon = new am4core.Sprite();
  homeButton.padding(7, 5, 7, 5);
  homeButton.width = 30;
  homeButton.scale = 2;
  homeButton.cursorOverStyle = am4core.MouseCursorStyle.pointer;
  homeButton.icon.path =
    "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  homeButton.fill = "#367B25";
  homeButton.realFill = "#367B25";
  homeButton.parent = chart;
  homeButton.align = "right";
  homeButton.valign = "bottom";
  homeButton.marginBottom = 5;
  homeButton.marginRight = 10;
  //homeButton.insertBefore(chart.zoomControl.plusButton);

  // Zoom control
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.parent = btnContainer;
  chart.zoomControl.scale = 1.2;
  chart.zoomControl.slider.height = 70;
  chart.zoomControl.cursorOverStyle = am4core.MouseCursorStyle.pointer;

  var excludedCountries = ["AQ"];

  // Add some data
  polygonSeries.data = [
    {
      title: "Brunei", // Custom data. Different from name
      fill: "#5C5CFF",
      id: "BN", // With polygonSeries.useGeodata = true, it will try and match this id, then apply the other properties as custom data
      //customData: "1995",
    },
    {
      title: "Cambodia",
      fill: "#5C5CFF",
      id: "KH",
    },
    {
      title: "Indonesia",
      fill: "#5C5CFF",
      id: "ID",
    },
    {
      title: "Lao",
      fill: "#5C5CFF",
      id: "LA",
    },
    {
      title: "Malaysia",
      fill: "#5C5CFF",
      id: "MY",
    },
    {
      title: "Myanmar",
      fill: "#5C5CFF",
      id: "MM",
    },
    {
      title: "Philippines",
      fill: "#ff5a5f",
      id: "PH",
    },
    {
      title: "Singapore",
      fill: "#5C5CFF",
      id: "SG",
    },
    {
      title: "Thailand",
      fill: "#5C5CFF",
      id: "TH",
    },
    {
      title: "Viet Nam",
      fill: "#5C5CFF",
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
