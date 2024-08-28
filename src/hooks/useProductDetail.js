import axios from "axios";
import {useQuery} from "@tanstack/react-query";

// 네트워크
const getProduct = async (id) => {
    const url = `http://localhost:8000/api/blog/${id}`
    const {data, status} = await axios.get(url)
    console.log(url)
    console.log(data)
    if (status === 200) {
        return data.body
    }
}
// useState 상태 관리
const useProductDetail = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProduct(id)
    })
}

export default useProductDetail