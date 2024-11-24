const Person = ({ name, number, deletePerson, id }) => {
    return <p>
        {name} {number}
        <button onClick={() => deletePerson(id, name)}>Delete</button>
    </p>
}

export default Person