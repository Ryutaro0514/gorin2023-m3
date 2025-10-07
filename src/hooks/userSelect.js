import { useEffect, useState } from "react"
import { userApi } from "../apis/profApi"

export const userSelect = () => {
    const [profile, setProfile] = useState({})

    const getProfile = async () => {
        const data = await userApi();
        setProfile(data)
    }

    useEffect(() => {
        getProfile()
    }, []);

    return { profile }
}