// import modules
import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

// import components
import QueryInput from "./components/QueryInput.jsx"
import Form from "./components/Form.jsx"
import Numbers from "./components/Numbers.jsx"
import Notification from "./components/Notification.jsx"

// import stylesheet
import './index.css'

const App = () => {

    // useState hooks
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newQuery, setNewQuery] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [notification, setNotification] = useState({message: null, classType: null})

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

        // use newName to check if they're in the phonebook already
        if (persons.map(person => person.name).includes(newName)) {
            // if yes, ask user if they want to update number to newNumber
            if (window.confirm(`${newName} is already in use, replace the old number with ${newNumber}?`)) {
                // if yes, get person to update as object using newName
                debugger
                const personToUpdate = persons.find(person => person.name === newName)
                // change personToUpdate number to newNumber
                personToUpdate.number = newNumber
                // update backend, PUT request server with personToUpdate using phonebook.js.update
                phonebookService
                    .update(personToUpdate.id, personToUpdate)
                    // update function returns promise with PUT request response.data (returnedPerson == personToUpdate)
                    .then(returnedPerson => {
                        //setPersons with updated person list by adding personToUpdate based on id
                        setPersons(persons
                            .map(person =>
                                person.id === personToUpdate.id
                                ? returnedPerson
                                : person
                            )
                        )
                        // set notification
                        setNotification({
                            message: `${returnedPerson.name}'s number is updated`,
                            classType: 'good'
                        })
                        // remove notification after timeout
                        setTimeout( () => {
                            setNotification({message: null, classType: null})
                        }, 3000)
                    })
                    .catch(err => {
                        // set notification
                        setNotification({
                            message: err.response.data.error,
                            classType: 'bad',
                        })
                        // remove notification after timeout
                        setTimeout( () => {
                            setNotification({message: null, classType: null})
                        }, 3000)
                    })
            }

            setNewName('')
            setNewNumber('')
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            phonebookService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons
                        .concat(returnedPerson)
                    )

                    // set notification
                    setNotification({
                        message: `${returnedPerson.name} added to phonebook`,
                        classType: 'good'
                    })

                    // remove notification after timeout
                    setTimeout( () => {
                        setNotification({message: null, classType: null})
                    }, 3000)

                    setNewName('')
                    setNewNumber('')
                })
                .catch(err => {
                    setNotification({
                        message: err.response.data.error,
                        classType: 'bad'
                    })
                    setTimeout( () => {
                        setNotification({message: null, classType: null})
                    }, 3000)
                })
        }
    }

    // delete function
    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            phonebookService
            .deleteID(id)
            .then(idToDelete => {
                setPersons(persons.filter(person => person.id !== idToDelete))
            }).catch(err => console.log(err))
        }
    }

    // sets persons to show
    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newQuery.toLowerCase()))

    return (
        <div>
            <h1>Phonebook</h1>

            <Notification notification={notification} />

            <QueryInput query={newQuery} handleInputChange={handleInputChange} />

            <h2>add a new</h2>

            <Form newName={newName} newNumber={newNumber} addPerson={addPerson} handleInputChange={handleInputChange} />

            <h2>Numbers</h2>

            <Numbers personsList={personsToShow} deletePerson={deletePerson} />

        </div>
    )
}

export default App