fetch(`https://api.openweathermap.org/data/2.5/forecast?q=havre&lang=fr&units=metric&appid=0268d2b9ffc0749f643062667959440b`)
.then(Response => Response.json())
.then((data)=> {
    console.log(data);
    document.querySelector('#weather_info').innerHTML=`
            <div class="row col-6 m-0">
                <p class="position-relative">
                    <span id="tempreture">${Math.round(data["list"][0].main.temp)}°</span>
                </p>
                <p id="weather_description" class="fw-bold">
                    ${data["list"][0].weather[0].description}
                </p>
                <p class="fw-bold">
                    Max <span id="max_tempreture">${Math.round(data["list"][0].main.temp_max)}</span> / Min <span id="min_tempreture">${Math.round(data["list"][0].main.temp_min)}</span>
                </p>
            </div>
            <div class="col-6 p-5">
                <img src="https://openweathermap.org/img/w/${data["list"][0].weather[0].icon}@2x.png" alt="">
                <p id="humidity" class="fs-4 fw-bold text-center">${data["list"][0].main.humidity} %</p>
            </div>
    `
    document.querySelector('#next_weather').innerHTML=""
    
    for (let index = 0; index < array.length; index++) {
        
    document.querySelector('#next_weather').innerHTML +=`
            <div class=" col flex-column p-0 text-center">
                <p class="fw-bold fs-3 m-0">3°</p>
                <img src="https://openweathermap.org/img/w/10d@2x.png" alt="">
                <p class="  m-0">15 h</p>
            </div
    `;
    }


})











function search_by_name (){
let city_name = document.querySelector('#search_input').value

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&lang=fr&units=metric&appid=0268d2b9ffc0749f643062667959440b`)
.then(Response => Response.json())
.then((weather)=> {
    console.log(weather);
    console.log(weather["city"].name);//city name
    console.log(weather["list"][0].main.temp);// degree
    console.log(weather["list"][0]);
    
    console.log(weather["list"][0]["weather"][0].description);

    document.querySelector('#current_city').innerHTML=`${weather["city"].name}`
    document.querySelector('#tempreture').innerHTML=`${weather["list"][0].main.temp}°`





})
}
document.querySelector('#search_button').addEventListener('click',function(){search_by_name();})
