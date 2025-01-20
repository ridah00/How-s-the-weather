function weather_hourly(data) {
  document.querySelector("#hourly_button").classList.add("active");
  document.querySelector("#daily_button").classList.remove("active");
  for (let index = 0; index < 10; index++) {
    document.querySelector("#next_weather").innerHTML += `
        <div class=" p-0 text-center">
            <p class="fw-bold fs-3 m-0">${
              Math.round(10 * data.list[index].main.temp) / 10
            }°c</p>
            <img src="https://openweathermap.org/img/wn/${
              data.list[index].weather[0].icon
            }@2x.png" alt="">
            <p class="  m-0">${moment(data.list[index].dt_txt).format(
              "HH[h]"
            )}</p>
        </div>
`;
  }
}
function weather_daily(data) {
  for (let index = 1; index < data.list.length; index++) {
    
    document.querySelector("#daily_button").classList.add("active");
    if (moment(data.list[index].dt_txt).format("HH[h]") == "12h") {
      document.querySelector("#next_weather").innerHTML += `
              <div class=" p-4 text-center ">
                  <p class="fw-bold fs-3 m-0">${
                    Math.round(10 * data.list[index].main.temp) / 10
                  }°c</p>
                  <img src="https://openweathermap.org/img/wn/${
                    data.list[index].weather[0].icon
                  }@2x.png" alt="">
                  <p class="  m-0"> ${moment(data.list[index].dt_txt).locale("fr").format("ddd Do")}  à ${moment(
        data.list[index].dt_txt
      ).format("HH[h]")}</p>
              </div>
      `;
    }
  }
}

fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=havre&lang=fr&units=metric&appid=0268d2b9ffc0749f643062667959440b`
)
  .then((Response) => Response.json())
  .then((data) => {
    document.querySelector("#error").innerHTML ="";
    document.querySelector("#hourly_button").classList.remove("active");
    document.querySelector("#city_name").innerHTML = data["city"].name;
    let country_name = new Intl.DisplayNames(["fr"], { type: "region" });

    document.querySelector("#country_name").innerHTML = `${country_name.of(
      data["city"].country
    )}`;
    document.querySelector("#weather_info").innerHTML = `
            <div class="row col-6 m-0">
                <p class="position-relative p-0">
                    <span id="tempreture">${data.list[0].main.temp.toPrecision(
                      2
                    )}°c</span>
                </p>
                <p id="weather_description" class="fw-bold">
                    ${data["list"][0].weather[0].description}
                </p>
                <p class="fw-bold">
                    Max <span id="max_tempreture">${
                      Math.round(10 * data.list[0].main.temp_max) / 10
                    }</span> / Min <span id="min_tempreture">${
      Math.round(10 * data.list[0].main.temp_min) / 10
    }</span>
                </p>
            </div>
            <div class="col-6 p-5">
                <img src="https://openweathermap.org/img/wn/${
                  data["list"][0].weather[0].icon
                }@2x.png" alt="">
                <p id="humidity" class="fs-4 fw-bold text-center">${
                  data["list"][0].main.humidity
                } %</p>
            </div>
    `;
    document.querySelector("#next_weather").innerHTML = "";

    weather_hourly(data);

    document
      .querySelector("#daily_button")
      .addEventListener("click", function () {
        document.querySelector("#next_weather").innerHTML = "";
        weather_daily(data);
      });
    document
      .querySelector("#hourly_button")
      .addEventListener("click", function () {
        document.querySelector("#next_weather").innerHTML = "";
        weather_hourly(data);
      });
  });

function search_by_name(city_name) {
  if (city_name != "") {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&lang=fr&units=metric&appid=0268d2b9ffc0749f643062667959440b`
    )
      .then((Response) => Response.json())
      .then((data) => {

        if(data.cod == "404"){
            document.querySelector("#city_name").innerHTML =""
            document.querySelector("#country_name").innerHTML =""
            document.querySelector("#error").innerHTML =`
                <p class="text-center" >oooops !!! ville au nom " ${document.querySelector("#search_input").value} " non trouvée </p>`;
            document.querySelector("#search_input").value = "";
            document.querySelector("#weather_info").innerHTML = "";
            document.querySelector("#next_weather").innerHTML = "";
            document.querySelector("#content").classList.add("d-none");
            
          }else {
        document.querySelector("#error").innerHTML ="";
        document.querySelector("#content").classList.remove("d-none");
        console.log(data);
        document.querySelector("#city_name").innerHTML = data["city"].name;
        let country_name = new Intl.DisplayNames(["fr"], { type: "region" });

        document.querySelector("#country_name").innerHTML = `${country_name.of(
          data["city"].country
        )}`;
        document.querySelector("#weather_info").innerHTML = `
            <div class="row col-6 m-0">
                <p class="position-relative p-0">
                    <span id="tempreture">${
                      Math.round(10 * data.list[0].main.temp) / 10
                    }°c</span>
                </p>
                <p id="weather_description" class="fw-bold">
                    ${data["list"][0].weather[0].description}
                </p>
                <p class="fw-bold">
                    Max <span id="max_tempreture">${
                      Math.round(10 * data.list[0].main.temp_max) / 10
                    }</span> / Min <span id="min_tempreture">${
          Math.round(10 * data.list[0].main.temp_min) / 10
        }</span>
                </p>
            </div>
            <div class="col-6 p-5">
                <img src="https://openweathermap.org/img/wn/${
                  data["list"][0].weather[0].icon
                }@2x.png" alt="">
                <p id="humidity" class="fs-4 fw-bold text-center">${
                  data["list"][0].main.humidity
                } %</p>
            </div>
    `;
        document.querySelector("#next_weather").innerHTML = "";
        weather_hourly(data);

        document
          .querySelector("#daily_button")
          .addEventListener("click", function () {
            document.querySelector("#next_weather").innerHTML = "";
            weather_daily(data);
          });
        document
          .querySelector("#hourly_button")
          .addEventListener("click", function () {
            document.querySelector("#next_weather").innerHTML = "";
            weather_hourly(data);
          });
        
      }});
  } 
}
document.querySelector("#search_button").addEventListener("click", function () {
  search_by_name(document.querySelector("#search_input").value);
});
document
  .querySelector("#search_input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.querySelector("#search_button").click();
    }
  });
