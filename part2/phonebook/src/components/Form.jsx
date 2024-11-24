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

export default Form