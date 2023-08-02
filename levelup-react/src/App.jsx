import "./App.css";
import { Routes, Route } from "react-router-dom";

// import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar.jsx";
import Modal from "./components/Modal";
import Toggle from "./components/Toggle";

import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PostListPage } from "./pages/PostListPage";
import { UniquePostPage } from "./pages/UniquePostPage";
import NewPostPage from "./pages/NewPostPage";

function App() {
  return (
    <>
      <Header />
      <Toggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:id" element={<UniquePostPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/new-post" element={<NewPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Modal />
      <NavBar />

      {/* <Footer /> */}
    </>
  );
}

export default App;
