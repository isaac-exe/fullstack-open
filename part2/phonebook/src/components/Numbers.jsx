import Person from './Person';

const Numbers = ({ personsList, deletePerson }) => {
    return(
        <div>
            {personsList.map(person =>
                <Person
                    name={person.name}
                    number={person.number}
                    deletePerson={() => deletePerson(person.id)}
                    key={person.id}
                    // id={person.id}
                />)}
        </div>
    )
}

export default Numbers