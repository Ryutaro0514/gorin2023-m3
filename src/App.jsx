import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginScene } from './components/loginScene/LoginScene'
import { SerectScene } from './components/loginScene/SerectScene'
import { useLogin } from "./hooks/userLogin"
import { userSelect } from './hooks/userSelect'
function App() {
  const [count, setCount] = useState(0)
  const { isLogin, login, logout } = useLogin()
  const { profile } = userSelect();
  //普通の配列 [] .length可能
  //連想配列 {} .length不可 Objectだから
  return (
    <>
      {!isLogin && <LoginScene login={login}></LoginScene>}
      {isLogin && Object.keys(profile).length != 0 && <SerectScene profile={profile} logout={logout}></SerectScene>}
    </>
  )
}

export default App
