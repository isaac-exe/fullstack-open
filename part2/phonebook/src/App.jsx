// import modules
import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

// import components
import QueryInput from "./components/QueryInput.jsx"
import Form from "./components/Form.jsx"
import Numbers from "./components/Numbers.jsx"

const App = () => {

    // useState hooks
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newQuery, setNewQuery] = useState('')
    const [showAll, setShowAll] = useState(true)

    // useEffect hooks
    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, [])

    // handles any new input changes
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

    // adds person to the phonebook
    const addPerson = event => {
        event.preventDefault()

        if (persons.map(person => person.name).includes(newName)) {
            // alert(`${newName} is already in the phonebook`)
            if (window.confirm(`${newName} is already in use, replace the old number with a new one?`)) {

                // get person to update as object
                const personToUpdate = persons.find(person => person.name === newName)

                // change personToUpdate number to newNumber
                personToUpdate.number = newNumber

                // update backend
                phonebookService
                    .update(personToUpdate.id, personToUpdate)
                    .then(returnedPerson => {
                        console.log(returnedPerson)
                        setPersons(persons.map(person => person.id === personToUpdate.id ? returnedPerson : person))
                    })
            }

            setNewName('')
            setNewNumber('')
        }
        else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            phonebookService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    // delete function
    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            phonebookService
            .deleteID(id)
            .then(deletedPerson => {
                setPersons(persons.filter(person => person.id !== deletedPerson.id))
            })
        }
    }

    // sets persons to show
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

            <Numbers personsList={personsToShow} deletePerson={deletePerson} />

        </div>
    )
}


export default App