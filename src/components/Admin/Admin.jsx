import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackXmark, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import SideButton from '../Common/SideButton'
import ModulesConfig from './modulesConfig'
import { Link, Route, Routes } from 'react-router-dom'
import sdmLogo from '/sdmLogo.png'



export default function Admin() {
  const sidebarRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sidebarRef])

  const testFunction = () => {
    console.log(sidebarRef);
  }

  return (
    <div className='flex w-screen h-screen'>
      <div
        id='sidebar'
        ref={sidebarRef}
        className={`
          fixed  inset-y-0 left-0 transform bg-neutral-800 px-5 transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <Link to='/admin' className='text-white'>
          <div className='flex  items-center'>
            <img src={sdmLogo} alt='Logo de Sabores Del Mundo' className=' h-20  object-cover' />
            <p className='text-xl font-bold px-3'>Sabores del Mundo</p>
            <FontAwesomeIcon icon={faXmark} onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>
        </Link>
        <ul className='text-start'>
          {ModulesConfig.map((module) => (
            <li key={module.key}>
              <Link to={module.route} className='text-white'>
                <SideButton title={module.title} icon={module.icon} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div id='main' className='w-full justify-evenly'>
        <div className='bg-neutral-800 p-4 flex'>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='text-white cursor-pointer'>
            <FontAwesomeIcon icon={faBars} className='w-5 p-1 bg-zinc-700 rounded hover:bg-zinc-600'/>
          </button>
        </div>
        <Routes>
          {ModulesConfig.map((module) => (
            <Route key={module.key} path={module.route} element={<module.component />} />
          ))}
        </Routes>
      </div>
    </div>
  )
}
