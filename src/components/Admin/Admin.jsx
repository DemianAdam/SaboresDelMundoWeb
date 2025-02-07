import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackXmark, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import SideButton from '../Common/SideButton'
import ModulesConfig from './modulesConfig'
import { useNavigate, Route, Routes } from 'react-router-dom'
import sdmLogo from '/sdmLogo.png'



export default function Admin() {
  const navigate = useNavigate()
  const sidebarRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [headingText, setHeadingText] = useState('Admin')

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

  const handleNavigation = (e, route) => {
    e.preventDefault()
    setSidebarOpen(!sidebarOpen)
    if (route) {
      navigate(`/admin/${route}`)
    }
    else{
      navigate('/admin')
    }
  }


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
        <div className='text-white cursor-pointer' onClick={(e) => { handleNavigation(e, null, 'Admin') }}>
          <div className='flex items-center mt-5 mb-10 border-b border-neutral-700 pb-2'>
            <img src={sdmLogo} alt='Logo de Sabores Del Mundo' className=' h-20  object-cover' />
            <p className='text-xl font-bold px-3'>Sabores del Mundo</p>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <ul className='text-start'>
          {ModulesConfig.map((module) => (
            <li key={module.key} className='cursor-pointer mb-4'>
              <div className='text-white' onClick={(e) => { handleNavigation(e, module.route, module.title) }}>
                <SideButton title={module.title} icon={module.icon} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div id='main' className='w-full flex flex-col'>
        <div id='header' className='bg-neutral-800 pl-9 flex relative h-16  '>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='text-white cursor-pointer inline-flex items-center p-0'>
            <FontAwesomeIcon icon={faBars} className='w-5 p-3 bg-zinc-700 rounded hover:bg-zinc-600' />
          </button>
          <h1 className='text-white text-4xl font-bold self-center absolute left-1/2 transform -translate-x-1/2'>{headingText}</h1>
        </div>
        <div id='main-content'>
          <Routes>
            {ModulesConfig.map((module) => (
              <Route key={module.key} path={module.route} element={<module.component setHeadingText={setHeadingText}/>} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  )
}
