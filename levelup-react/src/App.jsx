import "./styles/Header.css"
import { Routes, Route } from "react-router-dom";

// import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar.jsx";
import Modal from "./components/Modal";

import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PostListPage } from "./pages/PostListPage";
import { UniquePostPage } from "./pages/UniquePostPage";
import UserFloat from "./components/UserFloat";
import  NewPostPage from "./pages/NewPostPage";
import { TOS } from "./pages/TOS";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Menu } from "./components/Menu";

function App() {
  const [showDefaultModal, setShowDefaultModal] = useState(true);

  useEffect(() => {
    const isModalShownBefore = localStorage.getItem("isModalShown");

    if (!isModalShownBefore) {
      setShowDefaultModal(true);
      localStorage.setItem("isModalShown", true);
    }
  }, []);

  const hideDefaultModal = () => {
    setShowDefaultModal(false);
  };


  return (
    <>
      <UserFloat /> 
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:id" element={<UniquePostPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/new-post" element={<NewPostPage />} />
        <Route path="/tos" element={<TOS />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showDefaultModal && <Modal type="default" visible={true} onClose={hideDefaultModal} />}
      <Footer />
      <NavBar />
      <Menu isMenuOpen={true} className="open-menu"/>
    </>
  );
}

export default App;