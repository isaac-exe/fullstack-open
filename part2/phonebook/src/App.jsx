import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '555-555-5555' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newQuery, setNewQuery] = useState('')
    const [showAll, setShowAll] = useState(true)

    const handleInputChange = (event, inputType) => {
        if (inputType === 'name') {
            setNewName(event.target.value)
        } else if (inputType === 'number') {
            setNewNumber(event.target.value)
        } else {
            setNewQuery(event.target.value)
            setShowAll(!event.target.value)
        }
    }

    const addPerson = event => {
        event.preventDefault()

        if (persons.map(person => person.name).includes(newName)) {
            alert(`${newName} is already in the phonebook`)
            setNewName('')
            setNewNumber('')
        }
        else {
            const personObject = {
                name: newName, number: newNumber
            }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newQuery.toLowerCase()))


    return (
        <div>
            <h2>Phonebook</h2>

            <QueryInput query={newQuery} handleInputChange={handleInputChange} />

            <h2>add a new</h2>

            <Form newName={newName} newNumber={newNumber} addPerson={addPerson} handleInputChange={handleInputChange} />

            <h2>Numbers</h2>

            <Numbers personsList={personsToShow}/>

        </div>
    )
}

//Components

const Form = ({ newName, newNumber, addPerson, handleInputChange }) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                name:
                <input value={newName}
                       onChange={(event) => handleInputChange(event, 'name')}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={(event) => handleInputChange(event, 'number')}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const QueryInput = ({ query, handleInputChange }) => {
    return(
        <div>
            filter shown with:
            <input
            value={query}
            onChange={(event) => handleInputChange(event, 'query')}
            />
        </div>
    )
}

const Numbers = ({ personsList }) => {
    return(
        <div>
            {personsList.map(person =>
                <Person name={person.name} number={person.number} key={person.name}/>
            )}
        </div>
    )
}

const Person = ({ name, number }) => {
    return <p>{name} {number}</p>
}

export default App