import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginScene } from './components/loginScene/LoginScene'
import { useLogin } from './hooks/userLogin'

function App() {
  const [count, setCount] = useState(0)
  const {isLogin,login,logout}=useLogin()
  return (
    <>
            {!isLogin && <LoginScene login={login}></LoginScene>}
    </>
  )
}

export default App
