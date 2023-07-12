import './App.css'
import { Routes, Route } from 'react-router-dom'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { NavBar } from './components/NavBar.jsx'

import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { UserPage } from './pages/UserPage'
import { NotFoundPage } from './pages/NotFoundPage'
import PostListPage from './pages/PostsListPage'




function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts" element={<PostListPage />} />
          {/* <Route path="/posts/:id" element={<PostPage />} /> */}
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <PostListPage />
        <NavBar />
      <Footer />
    </>
  )
}

export default App
