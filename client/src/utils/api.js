import axios from "axios"

const params = {
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRAPI_APP_KEY,
    },

}

export const fecthDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_DEV_URL + url, params)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const fetchDataPost = async (url,ndata)=>{
    try {
        const { data } = await axios.post(process.env.REACT_APP_DEV_URL + url, ndata)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const makePaymentRequest = axios.create({
    baseURL:process.env.REACT_APP_DEV_URL,
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRAPI_APP_KEY,
    },
})