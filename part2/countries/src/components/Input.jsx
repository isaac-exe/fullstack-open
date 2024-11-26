const Input = ({ value, onChange }) => {
    return (
        <div>
            find country
            <input onChange={onChange} value={value} />
        </div>
    )
}

export default Input