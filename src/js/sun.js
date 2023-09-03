import { userLocation } from "./geo.js"

export const sun = (apiUrl) => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const now = new Date().getHours();

            document.querySelector('#confirmLocation') ? document.querySelector('#confirmLocation').remove() : ''
            userLocation.utc_offset = data.results.utc_offset/60
            userLocation.sunrise = data.results.sunrise
            userLocation.sunset = data.results.sunset

            const sunriseHour = Number(userLocation.sunrise.split(':')[0])
            const sunsetHour = Number(userLocation.sunset.split(':')[0]) + 12

            const timeOverThere = () => {
                let time = Number(now + (now + userLocation.utc_offset))
                time = time % 24
                // if (time > 24) {
                //     time = time - 24
                // } else if (time < 0) {
                //     time = time + 24
                // }
                return time
            }
            const sunFunc = () => {
                return (timeOverThere() > sunriseHour && timeOverThere() < sunsetHour) ? 'setting' : 'rising'
            }
            
            document.querySelector('#location-list').innerHTML = `
            <span class="location-text">${userLocation.locationLong}</span>

            <div class="${sunFunc()}">
                <div id="sunrise">
                    <i class="ms-Icon ms-Icon--Sunny" aria-hidden="true"></i>
                    <span class="sun-label">Sunrise:</span>
                    <span class="sun-rise">${userLocation.sunrise}</span>
                </div>

                <div id="sunset">
                    <i class="ms-Icon ms-Icon--ClearNight" aria-hidden="true"></i>
                    <span class="sun-label">Sunset:</span>
                    <span class="sun-set">${userLocation.sunset}</span>
                </div>
            </div>
            `
            

        })
        .catch((error) => console.error(`Error fetching data: ${error.message}`))
    }