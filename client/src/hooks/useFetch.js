import { useEffect, useState } from "react"
import { fecthDataFromApi } from "../utils/api"

const useFetch = (endpoint) => {
    const [data, setData] = useState()
    useEffect(() => {
        makeApiCall()
    }, [endpoint])
    const makeApiCall = async () => {
        const res = await fecthDataFromApi(endpoint)
        setData(res)
        console.log(res)
    }
    return { data }


}

export default useFetch
