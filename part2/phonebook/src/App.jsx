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

    const notificationHandler = notification => {
        setNotification({ message: notification.message, classType: notification.classType})
        setTimeout( () => {
            setNotification({message: null, classType: null})
        }, 3000)
    }

    const clearInput = () => {
        setNewName('')
        setNewNumber('')
    }

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

    const handleSubmit = event => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} is already in use, replace the old number with ${newNumber}?`)) {
                const personToUpdate = persons.find(person => person.name === newName)
                updatePerson({...personToUpdate, number: newNumber})
            }
        } else {
            addPerson({ name: newName, number: newNumber })
        }
    }

    const addPerson = personToAdd => {
        phonebookService
            .create(personToAdd)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                notificationHandler({
                    message: `${returnedPerson.name} added to phonebook`,
                    classType: 'good'
                })
            })
            .catch( error => {
                notificationHandler({
                    message: error.response.data.error,
                    classType: 'bad',
                })
            })
        clearInput()
    }

    const updatePerson = personToUpdate => {
        phonebookService
            .update(personToUpdate.id, personToUpdate)
            .then(updatedPerson => {
                setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
                notificationHandler({
                    message: `${updatedPerson.name} updated!`,
                    classType: 'good'
                })
            })
            .catch( error => {
                notificationHandler({
                    message: error.response.data.error,
                    classType: 'bad',
                })
            })
        clearInput()
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

            <Form newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />

            <h2>Numbers</h2>

            <Numbers personsList={personsToShow} deletePerson={deletePerson} />

        </div>
    )
}

export default App