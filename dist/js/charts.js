Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      // Get ctx from string
      var ctx = chart.chart.ctx;

      // Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || "Arial";
      var txt = centerConfig.text;
      var color = centerConfig.color || "#000";
      var maxFontSize = centerConfig.maxFontSize || 75;
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      // Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = chart.innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      var minFontSize = centerConfig.minFontSize;
      var lineHeight = centerConfig.lineHeight || 25;
      var wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      var words = txt.split(" ");
      var line = "";
      var lines = [];

      // Break words up into multiple lines if necessary
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (var n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      //Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  },
});

var options;
function editOptions(text, color, legend) {
  options = {
    elements: {
      center: {
        text: text,
        color: color,
        fontStyle: "Roboto",
        sidePadding: 60,
        minFontSize: 5,
        lineHeight: 25,
      },
    },
    responsive: false,
    cutoutPercentage: 70,
    legend: legend,
    tooltips: {
      enabled: true,
      xPadding: 40,
      yPadding: 20,
      backgroundColor: "rgba(0, 0, 0, 0.438)",
      caretSize: 10,
      caretPadding: 5,
      titleFontFamily: "Roboto",
      titleFontStyle: "normal",
      titleFontSize: 20,
      titleFontColor: "#f5f5f5",
      titleAlign: "center",
      titleMarginBottom: 0,
      height: 5,
      displayColors: false,
      callbacks: {
        title: function (tooltipItem, data) {
          return (
            data["datasets"][0]["data"][tooltipItem[0]["index"]] +
            "% " +
            data["labels"][tooltipItem[0]["index"]]
          );
        },
        label: function (tooltipItem, data) {
          return null;
          // return (
          //   data["datasets"][0]["data"][tooltipItem["index"]] +
          //   "% " +
          //   data["labels"][tooltipItem["index"]]
          // );
        },
      },
    },
  };
}

var ctx1;
var doughnutChart;
function makeChart(elemId, data) {
  ctx1 = document.getElementById(elemId).getContext("2d");

  doughnutChart = new Chart(ctx1, {
    type: "doughnut",
    data: data,
    options: options,
  });
}

/*---------- BRUNEI ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-brunei", {
  labels: [
    "Christian",
    "Muslim (Sunni Muslim)",
    "Buddhist",
    "Traditional Beliefs",
  ],
  datasets: [
    {
      label: "Brunei Religions",
      data: [8.7, 78.8, 7.8, 4.7],
      backgroundColor: ["#253680", "#f5f5f5", "#253680", "#253680"],
      borderColor: ["#f9d552", "#f9d552", "#f9d552", "#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-brunei", {
  labels: ["Malays", "Chinese", "Others"],
  datasets: [
    {
      label: "Brunei Languages",
      data: [65.8, 10.2, 24.0],
      backgroundColor: ["#f5f5f5", "#f9d552", "#f9d552"],
      borderColor: ["#253680", "#253680", "#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF BRUNEI ---------- */

/*---------- CAMBODIA ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-cambodia", {
  labels: ["Muslim", "Other Cambodia Religions", "Buddhism", "Christianity"],
  datasets: [
    {
      label: "Cambodia Religions",
      data: [2.3, 6.4, 90, 1.3],
      backgroundColor: ["#253680", "#253680", "#f5f5f5", "#253680"],
      borderColor: ["#f9d552", "#f9d552", "#f9d552", "#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-cambodia", {
  labels: ["N/A"],
  datasets: [
    {
      label: "Cambodia Languages",
      data: [100],
      backgroundColor: ["#f9d552"],
      borderColor: ["#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF CAMBODIA ---------- */

/*---------- INDONESIA ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-indonesia", {
  labels: ["Christian", "Muslim"],
  datasets: [
    {
      label: "indonesia Religions",
      data: [9.7, 87],
      backgroundColor: ["#253680", "#f5f5f5"],
      borderColor: ["#f9d552", "#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-indonesia", {
  labels: [
    "Javanese",
    "Indonesian",
    "Other",
    "Sundanese",
    "Madurese",
    "Minang",
    "Banjar",
    "Bali",
  ],
  datasets: [
    {
      label: "Indonesia Languages",
      data: [31.8, 19.5, 25, 14.5, 3.7, 2.0, 1.7, 1.6],
      backgroundColor: [
        "#f5f5f5",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
      ],
      borderColor: [
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
      ],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF INDONESIA ---------- */

/*---------- LAOS ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-laos", {
  labels: ["Buddhism", "Christianity", "Unspecified", "Others"],
  datasets: [
    {
      label: "Laos Religions",
      data: [64.7, 1.7, 31.4, 2.1],
      backgroundColor: ["#f5f5f5", "#253680", "#253680", "#253680"],
      borderColor: ["#f9d552", "#f9d552", "#f9d552", "#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-laos", {
  labels: ["N/A"],
  datasets: [
    {
      label: "Laos Languages",
      data: [100],
      backgroundColor: ["#f9d552"],
      borderColor: ["#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF LAOS ---------- */

/*---------- MALAYSIA ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-malaysia", {
  labels: [
    "Buddhism",
    "Hinduism",
    "Christianity",
    "Islam",
    "Traditional Chinese Religions",
  ],
  datasets: [
    {
      label: "Malaysia Religions",
      data: [19.8, 6.3, 9.2, 61.3, 3.4],
      backgroundColor: ["#253680", "#253680", "#253680", "#f5f5f5", "#253680"],
      borderColor: ["#f9d552", "#f9d552", "#f9d552", "#f9d552", "#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-malaysia", {
  labels: ["N/A"],
  datasets: [
    {
      label: "Malaysia Languages",
      data: [100],
      backgroundColor: ["#f9d552"],
      borderColor: ["#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF MALAYSIA ---------- */

/*---------- MYANMAR ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-myanmar", {
  labels: ["na", "na"],
  datasets: [
    {
      label: "Myanmar Religions",
      data: [50, 50],
      backgroundColor: ["#253680", "#f5f5f5"],
      borderColor: ["#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-myanmar", {
  labels: ["N/A"],
  datasets: [
    {
      label: "Myanmar Languages",
      data: [100],
      backgroundColor: ["#f9d552"],
      borderColor: ["#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF MYANMAR ---------- */

/*---------- PHILIPPINES ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-philippines", {
  labels: ["Protestant", "Catholic", "Muslim"],
  datasets: [
    {
      label: "Philippines Religions",
      data: [10.8, 80.58, 5.57],
      backgroundColor: ["#253680", "#f5f5f5", "#253680"],
      borderColor: ["#f9d552", "#f9d552", "#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-philippines", {
  labels: ["N/A"],
  datasets: [
    {
      label: "Philippines Languages",
      data: [100],
      backgroundColor: ["#f9d552"],
      borderColor: ["#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF PHILIPPINES ---------- */

/*---------- SINGAPORE ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-singapore", {
  labels: [
    "Hindu",
    "Muslim",
    "Buddhist",
    "Christian",
    "Taoist",
    "Others",
    "None",
  ],
  datasets: [
    {
      label: "Singapore Religions",
      data: [5, 14, 33.2, 18.8, 10, 0.6, 18.5],
      backgroundColor: [
        "#253680",
        "#253680",
        "#f5f5f5",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
      ],
      borderColor: [
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
      ],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-singapore", {
  labels: [
    "Ethnically chinese",
    "Malay",
    "Indians",
    "Eurasians, Filipino, Japanese, Korean, Vietnamese & Caucasian",
  ],
  datasets: [
    {
      label: "Singapore Languages",
      data: [74, 13.5, 10, 2.5],
      backgroundColor: ["#f5f5f5", "#f9d552", "#f9d552", "#f9d552"],
      borderColor: ["#253680", "#253680", "#253680", "#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF SINGAPORE ---------- */

/*---------- THAILAND ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-thailand", {
  labels: ["Muslim", "Buddhism", "Catholic Christians", "Others"],
  datasets: [
    {
      label: "Thailand Religions",
      data: [4.3, 94.6, 1, 0.1],
      backgroundColor: ["#253680", "#f5f5f5", "#253680", "#253680"],
      borderColor: ["#f9d552", "#f9d552", "#f9d552", "#f9d552"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-thailand", {
  labels: ["N/A"],
  datasets: [
    {
      label: "Thailand Languages",
      data: [100],
      backgroundColor: ["#f9d552"],
      borderColor: ["#253680"],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF THAILAND ---------- */

/*---------- VIETNAM ---------- */
// Religion Doughnut Chart
editOptions("RELIGION", "#253680", {
  display: true,
  position: "left",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
  },
});
makeChart("doughnut-chart-religion-vietnam", {
  labels: [
    "No religion or folk belief",
    "Buddhism",
    "Catholicism",
    "Protestantism",
    "Hoahaoism",
    "Caodaism",
    "Others",
  ],
  datasets: [
    {
      label: "Vietnam Religions",
      data: [73.7, 14.9, 7.4, 1.1, 1.5, 1.2, 0.2],
      backgroundColor: [
        "#f5f5f5",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
      ],
      borderColor: [
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
      ],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});

// Language Doughnut Chart
editOptions("LANGUAGE", "#f9d552", {
  display: true,
  position: "bottom",
  labels: {
    boxWidth: 30,
    padding: 25,
    fontFamily: "Roboto",
    fontColor: "#f5f5f5",
  },
});
makeChart("doughnut-chart-language-vietnam", {
  labels: ["Kinh", "Tay", "Thai", "Muong", "Hmong", "Khmer", "Nung", "Other"],
  datasets: [
    {
      label: "Vietnam Languages",
      data: [85.32, 1.92, 1.89, 1.51, 1.45, 1.37, 1.13, 5.41],
      backgroundColor: [
        "#f5f5f5",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
        "#f9d552",
      ],
      borderColor: [
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
        "#253680",
      ],
      borderWidth: 6,
      hoverBorderWidth: 2,
    },
  ],
});
/*---------- END OF VIETNAM ---------- */
