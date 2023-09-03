import {sun} from './sun.js'

export const userLocation = {
    latitude: '0',
    longitude: '0',
    location: '',
    locationLong: ''
}

export const renderConfirm = (userLocation) => {
    document.querySelector('body').insertAdjacentHTML('beforeend', `
    <div id="confirmLocation">
        <span class="location-text"><a href="https://www.google.com/maps/search/?api=1&query=${userLocation.locationLong}" target="_blank">Is this the correct location?</a></span>
        <button class="btn-confirmLocation"><i class="ms-Icon ms-Icon--BoxCheckmarkSolid" aria-hidden="true"></i>This is it!</button>
    </div>
    `)
    document.querySelector('.btn-confirmLocation').addEventListener('click', (e) => {
        sun(`https://api.sunrisesunset.io/json?lat=${userLocation.latitude}&lng=${userLocation.longitude}`)
    })
}

export const geo = (search) => {

    const stringValue = search.replaceAll(' ','+')
    
    const apiUrl = `https://geocode.maps.co/search?q=${stringValue}`

    const locationList = document.querySelector('#location-list')
    const renderData = (id, location, country, lat, lon) => {
        locationList.insertAdjacentHTML('beforeend', `
            <div id="location-${id}" class="location ${country}">
                <div id="check-${id}" class="checkbox"></div>
                <span class="" title="${location}">${location}</span>
                <div class="countryflag"></div>
            </div>
        `)
        const locationid = document.querySelector(`#location-${id}`).addEventListener('click', () => {
            userLocation.latitude = lat,
            userLocation.longitude = lon,
            userLocation.location = location.split(', ')[0]
            userLocation.locationLong = location
            document.querySelectorAll(`.location`).forEach(el => {
                el.classList.remove('selected')
                document.querySelector(`#location-${id}`).classList.add('selected')
            })
            document.querySelector('#confirmLocation') ? document.querySelector('#confirmLocation').remove() : ''
            renderConfirm(userLocation)
        })
    }
    const renderEmpty = () => {
        document.querySelector('#confirmLocation') ? document.querySelector('#confirmLocation').remove() : ''
        locationList.insertAdjacentHTML('beforeend', `
        <div id="emptyResults">
            <span>No results found for <i>"${search}"</i>. Please try your search again.</span>
        </div>
        `)
    }
    
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(el=> {
                const dnArray = el.display_name.split(', ')
                const country = dnArray[dnArray.length - 1].replaceAll(' ','').toLowerCase()
                renderData(el.place_id, el.display_name, country, el.lat, el.lon)
            })
            data.length < 1 ? renderEmpty() : ""
        })
        .catch((error) => console.error(`Error fetching data: ${error.message}`))
}