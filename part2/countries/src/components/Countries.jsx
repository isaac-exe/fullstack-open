import CountryLI from "./CountryLI"
import Country from "./Country"
import countriesServices from '../services/countries'
import { useState, useEffect } from "react";

const Countries = ({ countries, onClick }) => {
    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        if (countries.length === 1) {
        countriesServices
            .getWeather(countries[0].lat, countries[0].lon)
            .then(responseData => {
                setWeatherData({
                    temp: responseData.main.temp,
                    wind: responseData.wind.speed,
                    icon: responseData.weather[0].icon
                })
            }).catch( err => setWeatherData({
            temp: '69',
            wind: 'fast',
            icon: '13n'
        }))
        }
    }, [countries])

    if (countries.message) return countries.message

    if (countries.length === 1) {
        return <Country country={countries[0]} weatherData={weatherData} />
    }

    return(
        <ul>
            {countries.map(country => (
                <CountryLI
                    key={country.cca3}
                    countryName={country.name}
                    onClick={() => onClick(country)} />
            ))}
        </ul>
    )
}

export default Countries