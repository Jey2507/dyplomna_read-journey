import { Route, Routes } from 'react-router-dom'
import '../App/App.module.css'
import { lazy } from 'react'
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.jsx'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage.jsx'));
const NotfoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  )
}

export default App
