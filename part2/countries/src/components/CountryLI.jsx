const CountryLI = ({ countryName, onClick }) => {
    return(
        <div>
            {countryName} <button onClick={onClick}>show</button>
        </div>
    )
}

export default CountryLI