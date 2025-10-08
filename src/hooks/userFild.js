import { useEffect, useRef, useState } from "react"
import { fieldApi } from "../apis/fieldApi"

export const useFild = (level,setLevel)=>{
    const [field,setFild]=useState([])
    const [playerPos,setPlayerPos]=useState({x:0,y:0})
    const [isClear,setIsClear]=useState(false)
    const [time,setTime]=useState(0)
    const timeRef=useRef(0)
    useEffect(()=>{
        if(level!=0){
            const check =async()=>{
                const data = await fieldApi(level)
                setFild(data.objects)
                if (level == 1){
                    setPlayerPos({y:1,x:1})
                }else{
                    setPlayerPos({y:3,x:1})
                }

                timeRef.current=setInterval(()=>{
                    setTime(prev=>prev+1)
                },1000)
                return ()=>{
                    clearInterval(timeRef.current)
                }
            }
            check()
        }
    },[level])
}
useEffect(()=>{
    if(field.length===0) return;
    document.addEventListener("keydown",move);
    return ()=>{
        document.removeEventListener("keydown",move);
    }
})