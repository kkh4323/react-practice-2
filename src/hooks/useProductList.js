import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const getProducts = async () => {
    const url = 'http://localhost:8000/api/blog'
    const {data, status} = await axios.get(url)
    if (status === 200) {
        return data.body.data
    }
}
const useProductsList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    })
}

export default useProductsList