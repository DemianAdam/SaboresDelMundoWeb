import './App.css'
import { Route, Routes } from 'react-router-dom'
import Proximamente from './components/Proximamente/Proximamente'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Admin from './components/Admin/Admin'


function App() {

  return (
    <div className='text-center bg-zinc-900 text-white flex flex-col items-center justify-center gap-5 h-full'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
