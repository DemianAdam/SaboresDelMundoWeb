import React from 'react'
import axiosInstance from '../../../services/axios/axiosInstance';
import { Route, Routes, useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    const api = "https://script.google.com/macros/s/AKfycbwcefyH1SIvGYUOK2a0akLYgOP5XugLo4mWMpD3m9TMdu1a33dhsI42TfLImxqLYEwG/exec";
    const user = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    const requestObj = {
      endpoint: '/user/login',
      data: {
        user
      }
    }
    axiosInstance.post(api, JSON.stringify(requestObj))
      .then(res => {
        const token = res.data.data.authToken;
        localStorage.setItem('token', token)
        navigate('/admin')
      })
      .catch(err => {
        console.log(err)
      })


  }
  return (
    <>


      <div className='flex flex-col gap-5 shadow-lg shadow-black bg-gray-100 rounded-2xl p-5 text-gray-800 h-96 w-96 justify-center '>
        <h1 className="text-4xl xl:text-5xl font-bold">Login</h1>
        <form className="flex flex-col gap-3 justify-evenly h-2/3" onSubmit={handleSubmit}>
          <div className='text-left'>
            <label className='ml-1' htmlFor="username">Usuario</label>
            <input
              id='username'
              type="text"
              placeholder="Usuario"
              className="p-2 border-2 border-cgray rounded-md w-full"
              autoComplete='username'
              required
              pattern="[a-zA-Z0-9_.\-]{3,16}"
            />
          </div>
          <div className='text-left'>
            <label className='ml-1' htmlFor="password">Contraseña</label>
            <input
              id='password'
              type="password"
              placeholder="Contraseña"
              className="p-2 border-2 border-cgray rounded-md w-full"
              autoComplete='current-password'
              required
              pattern='(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,}'
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Ingresar
          </button>
        </form>
      </div>
    </>
  )
}
