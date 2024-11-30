const Person = ({ person, deletePerson }) => {
    return <p>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
    </p>
}

export default Person