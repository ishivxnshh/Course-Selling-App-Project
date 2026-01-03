import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route 
          path="/login"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/courses" replace />
              : <Login />
          }
        />

        <Route 
          path='/courses' element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App