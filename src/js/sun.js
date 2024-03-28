import { userLocation } from "./geo.js"

export const sun = (apiUrl) => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const nowUTC = new Date().getUTCHours();

            document.querySelector('#confirmLocation') ? document.querySelector('#confirmLocation').remove() : ''
            userLocation.utc_offset = data.results.utc_offset/60
            userLocation.sunrise = data.results.sunrise
            userLocation.sunset = data.results.sunset

            const sunriseHour = Number(userLocation.sunrise.split(':')[0])
            const sunsetHour = Number(userLocation.sunset.split(':')[0]) + 12


            const timeOverThere = () => {
                return Number(nowUTC + userLocation.utc_offset + 24 ) % 24
            }
            const sunFunc = () => {
                if (timeOverThere() > sunriseHour && timeOverThere() < sunsetHour) {
                    return 'setting'
                } else {
                    return 'rising'
                }
            }

            const sunriseDiv = `<div id="sunrise">
                <span class="sun-label"><i class="ms-Icon ms-Icon--Sunny" aria-hidden="true"></i>Sunrise:</span>
                <div class="bubbles">
                <span class="sun-rise i1">${userLocation.sunrise}</span>
                <span class="i1"></span>
                <span class="i2"></span>
                <span class="i3"></span>
                <span class="i4"></span>
                </div>
            </div>`

            const sunsetDiv = `<div id="sunset">
                <span class="sun-label"><i class="ms-Icon ms-Icon--ClearNight" aria-hidden="true"></i>Sunset:</span>
                <div class="bubbles">
                <span class="sun-set i1">${userLocation.sunset}</span>
                <span class="i1"></span>
                <span class="i2"></span>
                <span class="i3"></span>
                <span class="i4"></span>
                </div>
            </div>`

            const reorderDivs = function() {
                const divArr = [sunriseDiv, sunsetDiv]
                if (sunFunc() == 'rising') {
                    return divArr.join('')
                } else if (sunFunc() == 'setting') {
                    return divArr.reverse().join('')
                }
            }
            console.log(reorderDivs())
            document.querySelector('#location-list').innerHTML = `
            <span class="location-text">${userLocation.locationLong}</span>

            <div class="${sunFunc()}">
                ${reorderDivs()}
            </div>
            `
            

        })
        .catch((error) => console.error(`Error fetching data: ${error.message}`))
    }