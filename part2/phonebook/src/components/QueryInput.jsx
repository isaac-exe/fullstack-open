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

export default QueryInput