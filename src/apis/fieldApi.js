import { path } from "./Path"

export const fieldApi=async()=>{
    const res=await fetch(`${path}/api/fields?level={level}`)

    }
}