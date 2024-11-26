import { useState, useEffect } from 'react'

import countryServices from './services/countries'

import Input from "./components/Input";
import Countries from "./components/Countries.jsx";

function App() {
    const [inputValue, setInput] = useState('')
    const [countries, setCountries] = useState({message: 'input query for countries'})

    let fetchBool = false

    useEffect(() => {
        fetchBool = true
        setTimeout(() => {
            if (fetchBool) {
                if (!inputValue) setCountries({message: 'input query for countries'})
                else {
                    countryServices
                        .getCountries(inputValue)
                        .then(fetchedCountryList => {
                            if (fetchedCountryList.length > 10) setCountries({message: 'Too many matches'})
                            else if (fetchedCountryList.length === 0) setCountries({message: 'No matches'})
                            else setCountries(fetchedCountryList)
                        })
                }
            }
        }, 1500)
    }, [inputValue])

    const onClick = countryClicked => setCountries([countryClicked])

    const onChange = queryValue => {
        setInput(queryValue)
        fetchBool = false
    }

    return (
    <div>
        <Input value={inputValue} onChange={event => onChange(event.target.value)} />
        <Countries countries={countries} onClick={onClick} />
    </div>
  )
}

export default App
