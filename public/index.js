windValueAnimation();
uvValueAnimation();
selectedCityChange(indicator);

var indicator = true;

function debounced(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

function removeList() {
  const ul = document.querySelectorAll(".autocompleteUl");
  ul.forEach(function (option) {
    option.remove();
  })
}

function autocompleteColor() {
  if (indicator === false) {
    document.querySelectorAll(".xyz").forEach(function (randomm) {
      randomm.style.backgroundColor = "#F3F8FF";
      randomm.style.color = "#111015";
    });
    document.querySelectorAll(".autocompleteUl").forEach(function (ul) {
      ul.style.backgroundColor = "#F3F8FF";
    });
  } else if (indicator === true) {
    document.querySelectorAll(".xyz").forEach(function (randomm) {
      randomm.style.backgroundColor = "#102c57";
      randomm.style.color = "#fff";
    });
    document.querySelectorAll(".autocompleteUl").forEach(function (ul) {
      ul.style.backgroundColor = "#102c57";
    });
  }
}

// Input elemanını seçin
const searchInput = document.querySelector(".search");

// API istek fonksiyonu
function fetchCities() {
  removeList();
  const value = searchInput.value.trim().toLowerCase();
  if (!value) return; // Input boşsa API isteği yapma
  const url = `http://api.weatherapi.com/v1/search.json?key=7a4347939bdd4f3b802182054242405&q=${value}`;
  if(value === "") {
    removeList();
  }
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const cities = data.map((f) => ({
        filteredCity: f.name,
        filteredCitysCountry: f.country,
      }));

      cities.forEach((city) => {
        const newUl = document.createElement("ul");
        const newCity = document.createElement("li");
        const newButton = document.createElement("button");
        const newImg = document.createElement("i");

        newUl.className = "autocompleteUl";
        newButton.className = "xyz";
        newCity.className = "autocompleteLi";
        newImg.className = "fa-solid fa-location-dot";
        newImg.style.color = "#ab00fa";
        newButton.innerHTML = `${city.filteredCity}, ${city.filteredCitysCountry}`;

        document.querySelector(".autocomplete").appendChild(newUl);
        newUl.appendChild(newCity);
        newCity.appendChild(newImg);
        newCity.appendChild(newButton);
      });
      autocompleteColor();
    })
    .catch((error) => {
      console.error(error);
    });
}
// Debounce edilmiş API çağrısını input olayına bağlayın
searchInput.addEventListener("keyup", debounced(400, fetchCities));

document.querySelector(".darkMode").addEventListener("click", function () {
  indicator = false;
  if (
    !document.querySelector(".modeButton").classList.contains("modeButton2")
  ) {
    document.querySelector(".modeButton").classList.add("modeButton2");
    setTimeout(() => {
      document.querySelector(".darkMode").classList.add("lightMode");
    }, 150);
    var modeBtn = document.getElementById("modeBtn");
    modeBtn.classList.remove("fa-bolt");
    modeBtn.classList.add("fa-moon");
    document.body.style.backgroundColor = "#d7f5ff";
    document.body.style.color = "#111015";
    document.querySelector(".searchInput").style.backgroundColor = "#fff";
    document.querySelector(".searchInput").style.boxShadow = "none";
    document.querySelector(".search").style.backgroundColor = "#fff";
    document.querySelector(".searchBtn").style.backgroundColor = "#ffffff";
    document.querySelector(".search").classList.add("input2");
    document.querySelector(".uvCard").style.backgroundColor = "#9ee8ff";
    document.querySelectorAll(".xyz").forEach(function (randomm) {
      randomm.style.backgroundColor = "#F3F8FF";
      randomm.style.color = "#111015";
    });
    document.querySelectorAll(".autocompleteUl").forEach(function (ul) {
      ul.style.backgroundColor = "#F3F8FF";
    });
    document.querySelectorAll(".day").forEach(function (day) {
      day.style.backgroundColor = "#9ee8ff";
      day.style.boxShadow = "none";
      day.style.color = "#000";
    });
    document.querySelectorAll(".card").forEach(function (card) {
      card.style.backgroundColor = "#9ee8ff";
      card.style.boxShadow = "none";
      card.style.color = "#000";
    });
    document.querySelector(".otherCitysHeader").style.borderBottom =
      "2px solid #111015";
    document.querySelectorAll(".anotherCity").forEach(function (anotherCity) {
      anotherCity.style.backgroundColor = "#fff";
      anotherCity.style.boxShadow = "none";
    });
    document.querySelectorAll(".anotherCityCity").forEach(function (cityTitle) {
      cityTitle.style.color = "#111015";
    });
    document
      .querySelectorAll(".anotherCityWeatherCase")
      .forEach(function (caseText) {
        caseText.style.color = "#836fff";
      });
    document.querySelector(".table").style.backgroundColor = "#9ee8ff";
    document.querySelector(".selectedHourContainer").style.backgroundColor =
      "#9ee8ff";
    selectedCityChange();
  } else {
    indicator = true;
    setTimeout(() => {
      document.querySelector(".modeButton").classList.remove("modeButton2");
    }, 150);

    setTimeout(() => {
      document.querySelector(".darkMode").classList.remove("lightMode");
    }, 150);
    setTimeout(() => {
      var modeBtn2 = document.getElementById("modeBtn");
      modeBtn2.classList.remove("fa-moon");
      modeBtn2.classList.add("fa-bolt");
      document.body.style.backgroundColor = "#04062e";
      document.body.style.color = "#eeeeee";
      document.querySelector(".searchInput").style.backgroundColor = "#04062e";
      document.querySelector(".searchInput").style.boxShadow =
        "0rem 0rem 1rem 0rem #151534";
      document.querySelector(".search").style.backgroundColor = "#04062e";
      document.querySelector(".search").classList.remove("input2");
      document.querySelector(".searchBtn").style.backgroundColor = "#04062e";
      document.querySelector(".uvCard").style.backgroundColor = "#00044a";
      document.querySelectorAll(".xyz").forEach(function (randomm) {
        randomm.style.backgroundColor = "#102c57";
        randomm.style.color = "#b6b6b6";
      });
      document.querySelectorAll(".autocompleteUl").forEach(function (ul) {
        ul.style.backgroundColor = "#102c57";
      });
      document.querySelector(".day").style.boxShadow = "none";
      document.querySelectorAll(".day").forEach(function (day) {
        day.style.backgroundColor = "#00044a";
        day.style.color = "#fff";
        day.style.boxShadow = "none";
      });
      document.querySelectorAll(".card").forEach(function (card) {
        card.style.backgroundColor = "#00044a";
        card.style.color = "#fff";
        card.style.boxShadow = "none";
      });
      document.querySelector(".otherCitysHeader").style.borderBottom =
        "2px solid #fff";
      document.querySelectorAll(".anotherCity").forEach(function (anotherCity) {
        anotherCity.style.backgroundColor = "#00044a";
      });
      document
        .querySelectorAll(".anotherCityCity")
        .forEach(function (cityTitle) {
          cityTitle.style.color = "#ffffff";
        });
      document
        .querySelectorAll(".anotherCityWeatherCase")
        .forEach(function (caseText) {
          caseText.style.color = "#2aa0fa";
        });
      document.querySelector(".table").style.backgroundColor = "#00044a";
      document.querySelector(".selectedHourContainer").style.backgroundColor =
        "#00044a";
      selectedCityChange();
    }, 150);
  }
});

var forecastCounter = 0;

document.querySelector(".propertieButtons").addEventListener("click", () => {
  forecastCounter++;
  if (forecastCounter % 2 === 1) {
    document.querySelector(".forecastBtn").classList.add("forecastMode2");
    setTimeout(() => {
      document.querySelector(".propertieButtons").style.backgroundColor =
        "#ab00fa";
      document.querySelector(".forecastBtn").innerHTML = "Forecast";
    }, 400);
    setTimeout(() => {
      document.querySelector(".forecast").style.display = "none";
      document.querySelector(".forecastSecondCase").style.display = "flex";
      window.addEventListener("resize", function () {
        var windowWidth = window.innerWidth;
        if (windowWidth < 760) {
          document.querySelector(".forecastSecondCase").style.flexDirection =
            "column";
          document.querySelector(".forecastSecondCase").style.height = "490px";
          document.querySelector(".forecastSecondCase").style.gap = "50px";
          document.querySelector(".forecastSecondCase").style.width = "auto";
        } else {
          document.querySelector(".forecastSecondCase").style.flexDirection =
            "row";
          document.querySelector(".forecastSecondCase").style.height = "260px";
          document.querySelector(".forecastSecondCase").style.gap = "20px";
        }
      });
    }, 300);
  } else {
    document.querySelector(".forecastBtn").classList.remove("forecastMode2");
    setTimeout(() => {
      document.querySelector(".propertieButtons").style.backgroundColor =
        "#102c57";
      document.querySelector(".forecastBtn").innerHTML = "Hourly";
    }, 400);
    setTimeout(() => {
      document.querySelector(".forecastSecondCase").style.display = "none";
      document.querySelector(".forecast").style.display = "flex";
      window.addEventListener("resize", function () {
        var windowWidth = window.innerWidth;
        if (windowWidth < 760) {
          const divElement = document.querySelector(".forecastSecondCase");
          const computedStyle = window.getComputedStyle(divElement);
          const displayProperty = computedStyle.getPropertyValue("display");
          if (displayProperty === "none") {
            document.querySelector(".forecast").style.display = "grid";
            document.querySelector(".forecast").style.gridTemplateColumns =
              "100px 100px 100px";
            document.querySelector(".forecast").style.justifyContent = "center";
            document.querySelector(".forecast").style.marginBottom = "50px";
            document.querySelector(".forecast").style.gap = "50px";
          }
        } else {
          const divElement = document.querySelector(".forecastSecondCase");
          const computedStyle = window.getComputedStyle(divElement);
          const displayProperty = computedStyle.getPropertyValue("display");
          if (displayProperty === "none") {
            document.querySelector(".forecast").style.display = "flex";
            document.querySelector(".forecast").style.flexDirection = "row";
            document.querySelector(".forecast").style.justifyContent = "center";
            document.querySelector(".forecast").style.alignItems = "center";
            document.querySelector(".forecast").style.gap = "52px";
          }
        }
      });
    }, 300);
  }
});

function windValueAnimation() {
  var windType = document.querySelector(".windType");
  var windValue = document.querySelector(".windCardRowP1").innerText;
  var value = parseFloat(windValue);
  var counter = 0;
  var color;

  if (value >= 0 && value <= 5) {
    counter = 4;
    color = "#2aa0fa";
    windType.textContent = "Light";
    windType.style.color = color;
  } else if (value > 5 && value <= 15) {
    counter = 8;
    color = "#002a96";
    windType.textContent = "Moderate";
    windType.style.color = color;
  } else if (value > 15 && value <= 25) {
    counter = 12;
    color = "#eaff00";
    windType.textContent = "Fresh";
    windType.style.color = color;
  } else if (value > 25 && value <= 35) {
    counter = 16;
    color = "#fa4040";
    windType.textContent = "Strong";
    windType.style.color = color;
  } else if (value > 35) {
    counter = 20;
    color = "#ff0000";
    windType.textContent = "Gale";
    windType.style.color = color;
  }

  for (let i = 1; i < counter + 1; i++) {
    setTimeout(() => {
      var selector = document.querySelector(`.mainShape${i}`);
      selector.style.backgroundColor = color;
    }, 150 * i);
  }
}

function uvValueAnimation() {
  var uvValue = document.querySelector(".uvCardRowP1").innerText;
  const uvShape = document.querySelector(".shape");

  if (uvValue === "0 UV" || uvValue === "1 UV" || uvValue === "2 UV") {
    uvShape.style.backgroundColor = "#2aa0fa";
    uvShape.style.height = "25px";
  } else if (uvValue === "3 UV" || uvValue === "4 UV" || uvValue === "5 UV") {
    uvShape.style.backgroundColor = "#002a96";
    uvShape.style.height = "45px";
  } else if (uvValue === "6 UV" || uvValue === "7 UV") {
    uvShape.style.backgroundColor = "#eaff00";
    uvShape.style.height = "65px";
  } else if (uvValue === "8 UV" || uvValue === "9 UV" || uvValue === "10 UV") {
    uvShape.style.backgroundColor = "#fa4040";
    uvShape.style.height = "85px";
  } else if (
    uvValue === "11 UV" ||
    uvValue === "12 UV" ||
    uvValue === "13 UV"
  ) {
    uvShape.style.backgroundColor = "#ff0000";
    uvShape.style.height = "105px";
  }
}

function selectedCityChange() {
  var locationFullName = document.querySelector(".locationName").textContent;
  var locationName = locationFullName.split(",")[0].trim();

  const selectedCitys = [
    "Istanbul",
    "Karabuk",
    "London",
    "Tokyo",
    "Berlin",
    "Paris",
    "Rome",
  ];
  switch (locationName) {
    case selectedCitys[0]:
      document.querySelector(".anotherCity1").style.backgroundColor = "#c8ff00";
      break;
    case selectedCitys[1]:
      document.querySelector(".anotherCity2").style.backgroundColor = "#83ff00";
      break;
    case selectedCitys[2]:
      document.querySelector(".anotherCity3").style.backgroundColor = "#c8ff00";
      break;
    case selectedCitys[3]:
      document.querySelector(".anotherCity4").style.backgroundColor = "#c8ff00";
      break;
    case selectedCitys[4]:
      document.querySelector(".anotherCity5").style.backgroundColor = "#c8ff00";
      break;
    case selectedCitys[5]:
      document.querySelector(".anotherCity6").style.backgroundColor = "#c8ff00";
      break;
    case selectedCitys[6]:
      document.querySelector(".anotherCity7").style.backgroundColor = "#836fff";
      break;

    default:
      break;
  }
}

/* ********************************     HOURLY DOM MANUPULATE PART ********************************* */

const value1 = document.querySelector(".clocktemp1").innerText;
const value2 = document.querySelector(".clocktemp2").innerText;
const value3 = document.querySelector(".clocktemp3").innerText;
const value4 = document.querySelector(".clocktemp4").innerText;
const value5 = document.querySelector(".clocktemp5").innerText;
const value6 = document.querySelector(".clocktemp6").innerText;

const img1 = document.querySelector(".clockicon1").innerText;
const img2 = document.querySelector(".clockicon2").innerText;
const img3 = document.querySelector(".clockicon3").innerText;
const img4 = document.querySelector(".clockicon4").innerText;
const img5 = document.querySelector(".clockicon5").innerText;
const img6 = document.querySelector(".clockicon6").innerText;

const text1 = document.querySelector(".clocktext1").innerText;
const text2 = document.querySelector(".clocktext2").innerText;
const text3 = document.querySelector(".clocktext3").innerText;
const text4 = document.querySelector(".clocktext4").innerText;
const text5 = document.querySelector(".clocktext5").innerText;
const text6 = document.querySelector(".clocktext6").innerText;

var chartValue = [value1, value2, value3, value4, value5, value6];
var selectedHourIcon = [img1, img2, img3, img4, img5, img6];
var selectedHourText = [text1, text2, text3, text4, text5, text6];
var clocks = ["04:00", "08:00", "12:00", "16:00", "20:00", "00:00"];

hourlyChart();

function hourlyChart() {
  var chartHeight = [];
  var chartColor = [];

  for (var a = 0; a < 6; a++) {
    if (chartValue[a] >= 0) {
      chartHeight[a] = 4 * chartValue[a];
    } else {
      chartHeight[a] = -4 * chartValue[a];
    }
  }

  for (var i = 0; i < 6; i++) {
    console.log(chartValue[i]);
    if (chartValue[i] < 0) {
      chartColor[i] = "#5ab2ff";
    } else if (chartValue[i] >= 0 && chartValue[i] <= 13) {
      chartColor[i] = "#ffc94a";
    } else if (chartValue[i] > 13 && chartValue[i] <= 25) {
      chartColor[i] = "#ff6500";
    } else {
      chartColor[i] = "#c40c0c";
    }
    console.log(chartColor[i]);
  }

  for (var j = 1; j < 7; j++) {
    var selectedChart = document.querySelector(`.chartValue${j}`);

    selectedChart.style.height = `${chartHeight[j - 1]}px`;
    selectedChart.style.backgroundColor = chartColor[j - 1];
  }
}

const buttons = document.querySelectorAll(".hourlyBtn");

buttons.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    buttons.forEach((button) => {
      button.style.color = "#2aa0fa";
      button.style.backgroundColor = "inherit";
    });
    btn.style.color = "#00044a";
    btn.style.backgroundColor = "#2dc4c8";
    setTimeout(() => {
      document.querySelector(".selectedBtn").textContent = clocks[index];
      document.querySelector(".selectedHourIcon").src = selectedHourIcon[index];
      document.querySelector(
        ".selectedHourTemp"
      ).textContent = `${chartValue[index]} °`;
      document.querySelector(".selectedHourWeather").textContent =
        selectedHourText[index];
      console.log(index);
    }, 150);
  });
});
