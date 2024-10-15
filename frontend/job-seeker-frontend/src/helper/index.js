import {decodeToken} from 'react-jwt'

export const addTokenToHeader = ({headers}) => {
    const token = localStorage.getItem('token')
    if(token) {
        headers.Authorization = `${token}`
    }
    return headers
}


export const isEditable = (id) => {
    try {
        const token = localStorage.getItem('token')
        const decoded = decodeToken(token)
        return decoded.id == id
    } catch (error) {
        console.log("getIdFromToken: ", error)
        return false
    }
}

export const tokenAvailable = () => {
    const token = localStorage.getItem('token')
    return token ? true : false
}