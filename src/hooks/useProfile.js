import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const getProfile = async () => {
    const accessToken = await localStorage.getItem("accessToken")
    const config = {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        }

    }
    const url = 'http://localhost:8000/api/auth'
    const { data, status } = await axios.get(url, config)

    if (status === 200) {
        return data.body
    }
}

const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile()
    })
}

export default useProfile