import { path } from "./Path"

export const fieldApi = async () => {
    const res = await fetch(`${path}/api/fields?level={level}`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer${sessionStorage.getItem("token")}`
        }
    })
    const data=await res.json();
    return data
}
