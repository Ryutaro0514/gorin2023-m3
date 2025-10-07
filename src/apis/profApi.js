import { path } from "./Path";

export const userApi = async () => {
    const res = await fetch(`${path}/users/profile`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json",
                        "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
    const data = await res.json();
    return data;
}
