import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (idToUpdate, newPerson) => {
    const request = axios.put(`${baseUrl}/${idToUpdate}`, newPerson)
    return request.then(response => response.data)
}

const deleteID = idToDelete => {
    const request = axios.delete(`${baseUrl}/${idToDelete}`)
    return request.then(response => response.headers.id)
}

export default { getAll, create, deleteID, update, }