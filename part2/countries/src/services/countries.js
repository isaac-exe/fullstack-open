import axios from 'axios'

const getCountries = (input) => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => {
        return response.data.filter(country =>
            country.name.common.toLowerCase().includes(input))
            .map(country => {
                return(
                    {
                        name: country.name.common,
                        area: country.area,
                        capital: country.capital,
                        languages: country.languages,
                        flag: country.flags.png,
                        cca3: country.cca3,
                        lat: country.latlng[0],
                        lon: country.latlng[1]
                    }
                )
            })
    })
}

const getWeather = (lat, lon) => {
    const key = import.meta.env.VITE_SOME_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { getCountries, getWeather }