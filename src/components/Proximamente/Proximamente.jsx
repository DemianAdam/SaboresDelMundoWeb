import React from 'react'
import { useState } from 'react'
import sdmLogo from '/sdmLogo.png'

export default function Proximamente() {
    const [count, setCount] = useState(-4)

    const handleClick = () => {
        setCount(count + 1)
    }

    const reward = (rewardText, clickNumber) => {
        return (
            <>
                {
                    count == clickNumber &&
                    <>
                        <h2>{rewardText}</h2>
                        <p>Queres Seguir?</p>
                    </>
                }
            </>
        )
    }

    return (
        <>
            {
                reward("Ganaste!! Llegaste a 90", 90)
            }
            <div className='w-3xs xl:w-sm'>
                <img src={sdmLogo} className="
                    select-none
                    cursor-pointer
                    [transition:filter_300ms,transform_0.2s_ease]
                    hover:[filter:drop-shadow(0_0_2em_#61dafbaa)]
                    active:[animation:none]
                    active:[transform:scale(0.8)]      
                    " alt="React logo" onClick={handleClick} onDragStart={(e) => e.preventDefault()} />
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold">
                {count < 0
                    ? `Proximamente${".".repeat(Math.abs(count + 1))}`
                    : count}
            </h1>



            <a className="text-gray-500" href="https://www.instagram.com/saboresdelmundo.arg/">Seguinos en Instagram</a>
        </>
    )
}
