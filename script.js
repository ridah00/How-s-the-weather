fetch(`https://api.openweathermap.org/data/2.5/forecast?q=havre&lang=fr&units=metric&appid=0268d2b9ffc0749f643062667959440b`)
.then(Response => Response.json())
.then((data)=> {
    console.log(data);
    document.querySelector('.city_name').innerHTML = data["city"].name
    let country_name = new Intl.DisplayNames(['fr'], {type: 'region'});
    
    document.querySelector('#country_name').innerHTML = `${country_name.of(data["city"].country)}`
    document.querySelector('#weather_info').innerHTML=`
            <div class="row col-6 m-0">
                <p class="position-relative">
                    <span id="tempreture">${Math.round(10 * data.list[0].main.temp) / 10}°</span>
                </p>
                <p id="weather_description" class="fw-bold">
                    ${data["list"][0].weather[0].description}
                </p>
                <p class="fw-bold">
                    Max <span id="max_tempreture">${Math.round(10 * data.list[0].main.temp_max) / 10}</span> / Min <span id="min_tempreture">${Math.round(10 * data.list[0].main.temp_min) / 10}</span>
                </p>
            </div>
            <div class="col-6 p-5">
                <img src="https://openweathermap.org/img/wn/${data["list"][0].weather[0].icon}@2x.png" alt="">
                <p id="humidity" class="fs-4 fw-bold text-center">${data["list"][0].main.humidity} %</p>
            </div>
    `
    document.querySelector('#next_weather').innerHTML=""
    
    for (let index = 0; index < 10; index++) {
        
    document.querySelector('#next_weather').innerHTML +=`
            <div class=" p-0 text-center">
                <p class="fw-bold fs-3 m-0">${Math.round(10 * data.list[index].main.temp) / 10}°c</p>
                <img src="https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png" alt="">
                <p class="  m-0">${moment(data.list[index].dt_txt).format("HH[h]")}</p>
            </div>
    `;
    }


})











function search_by_name (city_name){


fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&lang=fr&units=metric&appid=0268d2b9ffc0749f643062667959440b`)
.then(Response => Response.json())
.then((data)=> {
    console.log(data);
    document.querySelector('.city_name').innerHTML = data["city"].name
    document.querySelector('#weather_info').innerHTML=`
            <div class="row col-6 m-0">
                <p class="position-relative">
                    <span id="tempreture">${Math.round(10 * data.list[0].main.temp) / 10}°</span>
                </p>
                <p id="weather_description" class="fw-bold">
                    ${data["list"][0].weather[0].description}
                </p>
                <p class="fw-bold">
                    Max <span id="max_tempreture">${Math.round(10 * data.list[0].main.temp_max) / 10}</span> / Min <span id="min_tempreture">${Math.round(10 * data.list[0].main.temp_min) / 10}</span>
                </p>
            </div>
            <div class="col-6 p-5">
                <img src="https://openweathermap.org/img/wn/${data["list"][0].weather[0].icon}@2x.png" alt="">
                <p id="humidity" class="fs-4 fw-bold text-center">${data["list"][0].main.humidity} %</p>
            </div>
    `
    document.querySelector('#next_weather').innerHTML=""
    
    for (let index = 0; index < 10; index++) {
        
    document.querySelector('#next_weather').innerHTML +=`
            <div class=" p-0 text-center">
                <p class="fw-bold fs-3 m-0">${Math.round(10 * data.list[index].main.temp) / 10}°c</p>
                <img src="https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png" alt="">
                <p class="  m-0">${moment(data.list[index].dt_txt).format("HH[h]")}</p>
            </div>
    `;
    }

})
}
document.querySelector('#search_button').addEventListener('click',function(){search_by_name(document.querySelector('#search_input').value);})