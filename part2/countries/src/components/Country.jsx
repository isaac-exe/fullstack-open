const Country = ({ country, weatherData }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
            </ul>
            <img src={country.flag} alt={`flag of ${country.name}`}/>
            <h3>Weather in {country.capital}</h3>
            <p>temperature {weatherData.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt=""/>
            <p>wind {weatherData.wind}</p>
        </div>
    )
}

export default Country