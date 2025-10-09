import { useEffect, useRef, useState } from "react"
import { fieldApi } from "../apis/fieldApi"

export const useFild = (level, setLevel) => {
    const [field, setFild] = useState([])
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
    const [isClear, setIsClear] = useState(false)
    const [time, setTime] = useState(0)
    const timeRef = useRef(0)
    useEffect(() => {
        if (level != 0) {
            const check = async () => {
                const data = await fieldApi(level)
                setFild(data.objects)
                if (level == 1) {
                    setPlayerPos({ y: 1, x: 1 })
                } else {
                    setPlayerPos({ y: 3, x: 1 })
                }

                timeRef.current = setInterval(() => {
                    setTime(prev => prev + 1)
                }, 1000)
                return () => {
                    clearInterval(timeRef.current)
                }
            }
            check()
        }
    }, [level])
    const move = (e) => {
        if (field.length === 0) return;
        setPlayerPos(prev => {
            let newY = prev.y;
            let newX = prev.x;
            let direction = "";
            switch (e.key) {
                case "ArrowLeft":
                    direction = "left";
                    newX = newX - 1;
                    break;
                case "ArrowRight":
                    direction = "right";
                    newX = newX + 1;
                    break;
                case "ArrowUp":
                    direction = "up";
                    newY = newY - 1;
                    break;
                case "ArrowDown":
                    direction = "down";
                    newY = newY + 1;
                    break;
                default:
                    break;
            }
            const newField = [...field];
            if (newField[newY][newX] == 0) {
                newField[newY][newX] = 2;
                newField[prev.y][prev.x] = 0;
                setField(newField);
                return { y: newY, x: newX };
            }
            if (newField[newY][newX] == 1) {
                return { y: prev.y, x: prev.x };
            }
            else if (newField[newY][newX] == 3) {
                if (direction == "left") {
                    if (newField[newY][newX - 1] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY][newX - 1] = 3;
                    }
                }
                if (direction == "right") {
                    if (newField[newY][newX + 1] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY][newX + 1] = 3;
                    }
                }
                if (direction == "up") {
                    if (newField[newY - 1][newX] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY - 1][newX] = 3;
                    }
                }
                if (direction == "down") {
                    if (newField[newY + 1][newX] == 0) {
                        newField[newY][newX] = 0;
                        newField[newY + 1][newX] = 3;
                    }
                }
                setField(newField);
                return { y: prev.y, x: prev.x };
            } else if (newField[newY][newX] == 4) {
                setIsClear(true);
            }
            setField(newField);
            return { y: newY, x: newX };
        })
    }
    useEffect(() => {
        if (field.length === 0) return;
        document.addEventListener("keydown", move);
        return () => {
            document.removeEventListener("keydown", move);
        }
    }, [field]);

    useEffect(() => {
        if (isClear) {
            clearInterval(timeRef.current);
            const check = async () => {
                const data = await postResultApi(level, time);
                if (data.success) {
                    return alert("投稿が完了しました");
                }
            }
            check();
        }
    }, [isClear]);

    const replay = () => {
        setTime(0);
        setPlayerPos({ y: 0, x: 0 });
        setField([]);
        setLevel(0);
        setIsClear(false);
    }
    return { field, isClear, time, replay }
}
