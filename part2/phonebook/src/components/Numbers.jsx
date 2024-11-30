import Person from './Person';

const Numbers = ({ personsList, deletePerson }) => {
    return(
        <div>
            {personsList.map(person =>
                <Person
                    person={person}
                    deletePerson={(id, name) => deletePerson(id, name)}
                    key={person.id}
                />)}
        </div>
    )
}

export default Numbers