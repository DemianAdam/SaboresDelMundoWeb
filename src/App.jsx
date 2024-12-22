import { useState } from 'react'
import sdmLogo from './assets/sdmLogo.png'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(-4)

  const handleClick = () => {
    setCount(count + 1)
  }



  return (
    <>
      <div>
        <img src={sdmLogo} className="logo" alt="React logo" onClick={handleClick} onDragStart={(e) => e.preventDefault()} />
      </div>
      {
        count < 0 ?
          (<h1>Proximamente{ ".".repeat( Math.abs(count+1))}</h1>)
          :
          (<h1>{count}</h1>)
      }

      <p className="follow-on-instagram">
        <a className="follow-on-instagram" href="https://www.instagram.com/saboresdelmundo.arg/">Seguinos en Instagram</a>
      </p>
    </>
  )
}

export default App
