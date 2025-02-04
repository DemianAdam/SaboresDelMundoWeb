import './App.css'
import { Route, Routes } from 'react-router-dom'
import Proximamente from './components/Proximamente/Proximamente'
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'


function App() {

  return (
    <div className='text-center bg-cgray text-white flex flex-col items-center justify-center h-screen gap-5'>
      <Routes>
        <Route path="/" element={<Proximamente />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <h1>Admin</h1>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
