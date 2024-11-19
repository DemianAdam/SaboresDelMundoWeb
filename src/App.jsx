import { useState } from 'react'
import sdmLogo from './assets/sdmLogo.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://www.instagram.com/saboresdelmundo.arg/">
          <img src={sdmLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>Proximamente...</h1>
      <p className="follow-on-instagram">
        <a className="follow-on-instagram" href="https://www.instagram.com/saboresdelmundo.arg/">Seguinos en Instagram</a>
      </p>
    </>
  )
}

export default App
