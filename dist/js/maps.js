var previousCountryInfoPage; //Change when new container-country opens

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
  // polygonTemplate.togglable = true;
  var countryModalOpen = false;
  var countryName;
  // var lastSelected;
  polygonTemplate.events.on("hit", function (ev) {
    // if (lastSelected) {
    //   // This line serves multiple purposes:
    //   // 1. Clicking a country twice actually de-activates, the line below
    //   //    de-activates it in advance, so the toggle then re-activates, making it
    //   //    appear as if it was never de-activated to begin with.
    //   // 2. Previously activated countries should be de-activated.
    //   lastSelected.isActive = false;
    // }
    // ev.target.series.chart.zoomToMapObject(ev.target);
    // if (lastSelected !== ev.target) {
    //   lastSelected = ev.target;
    // }

    ev.target.series.chart.zoomToMapObject(ev.target);

    countryName = ev.target.dataItem.dataContext.name;

    if (countryName == "Lao People's Democratic Republic") {
      $("#modal-country-img").attr(
        "src",
        "./dist/img/country-circles/laos.png"
      );
    } else {
      $("#modal-country-img").attr(
        "src",
        "./dist/img/country-circles/" + countryName.toLowerCase() + ".png"
      );
    }
    $("#modal-country-name").html(countryName);

    if (countryModalOpen == false) {
      anime({
        targets: "#modal-country",
        opacity: [0, 1],
        left: ["-185px", "48px"],
        delay: anime.stagger(50),
      });

      countryModalOpen = true;
    }
  });

  // Create hover state and set alternative fill color
  var activeState = polygonTemplate.states.create("active");
  activeState.properties.fill = am4core.color(white);
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

  /*---------- MODAL EVENTS ---------- */
  document.querySelectorAll(".btn-back-map").forEach((item) => {
    item.addEventListener("click", (event) => {
      anime({
        targets: "#container-countries",
        left: "100%",
        display: "none",
        easing: "cubicBezier(.5, .05, .5, .5)",
        duration: 600,
        complete: function (anim) {
          document.querySelector("#group3").scrollIntoView({
            behavior: "smooth",
          });

          chart.goHome();
        },
      });
    });
  });

  $("#country-modal-close").on("click", () => {
    anime({
      targets: "#modal-country",
      opacity: [1, 0],
      left: [0, "-233px"],
      delay: anime.stagger(50),
    });

    countryModalOpen = false;
    chart.goHome();
  });

  var previousCountryPage;
  $("#btn-go-country").on("click", () => {
    previousCountryInfoPage = null;
    if (countryName == "Lao People's Democratic Republic") {
      if (previousCountryPage != null) {
        $(previousCountryPage).css({ display: "none" });
      }

      $(".container-laos").css({
        display: "grid",
      });

      previousCountryPage = $(".container-laos");
    } else {
      if (previousCountryPage != null) {
        $(previousCountryPage).css({ display: "none" });
      }

      $(".container-" + countryName.toLowerCase()).css({
        display: "grid",
      });

      previousCountryPage = $(".container-" + countryName.toLowerCase());
    }

    anime({
      targets: "#container-countries",
      left: 0,
      duration: 600,
      easing: "cubicBezier(.5, .05, .5, .5)",
    });

    anime({
      targets: "#modal-country",
      opacity: [1, 0],
      left: [0, "-233px"],
      delay: anime.stagger(50),
    });

    countryModalOpen = false;

    // Fix SplideJS slides by refreshing them
    splides.forEach((splide) => {
      splide.refresh();
    });
    primarySplide.forEach((splide) => {
      splide.refresh();
    });
    secondarySplide.forEach((splide) => {
      splide.refresh();
    });
  });

  /**----- END ----- */

  getMap("chartdivBrunei", am4geodata_bruneiDarussalamHigh);
  getMap("chartdivCambodia", am4geodata_cambodiaLow);
  getMap("chartdivIndonesia", am4geodata_indonesiaLow);
  getMap("chartdivLaos", am4geodata_laosLow);
  getMap("chartdivMalaysia", am4geodata_malaysiaLow);
  getMap("chartdivMyanmar", am4geodata_myanmarLow);
  getMap("chartdivPhilippines", am4geodata_philippinesLow);
  getMap("chartdivSingapore", am4geodata_singaporeLow);
  // getMap("chartdivThailand", am4geodata_thailandLow);
  // getMap("chartdivVietnam", am4geodata_vietnamLow);
});

function getMap(idDiv, geoData) {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create map instance
  var chart = am4core.create(idDiv, am4maps.MapChart);
  chart.maxZoomLevel = 1;
  chart.seriesContainer.draggable = false;
  chart.seriesContainer.resizable = false;

  // Set map definition
  chart.geodata = geoData;

  // Set projection
  chart.projection = new am4maps.projections.Mercator();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  polygonSeries.calculateVisualCenter = true;

  polygonSeries.tooltip.getFillFromObject = false;
  polygonSeries.tooltip.background.fill = white;

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipHTML = '<div style="color:#253680;"> {name} </div>';
  polygonTemplate.fill = blue;
  polygonTemplate.stroke = yellow;

  // Create hover & active state and set alternative fill color
  var district = polygonTemplate.states.create("hover");
  district.properties.fill = am4core.color(white);
  var ss = polygonTemplate.states.create("active");
  ss.properties.fill = am4core.color(white);
}
