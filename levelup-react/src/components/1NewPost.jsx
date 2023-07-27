import { useState } from 'react';
import '../index.css';
//import Modal from '../forms/Modal';
import { NewPostForm } from '../forms/NewPostForm';

const NewPost = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleNewPostClick = () => {
        setModalOpen(true);
    };
   {/** 
    const handleCloseModal = () => {
    setModalOpen(false);
      };
*/} 
  return (
    <div>
      <h2>New post page</h2>
      <button onClick={handleNewPostClick}>New Post</button>
{/*** 
      {modalOpen && <Modal onClose={handleCloseModal} />}*/}
    </div>
  );
};

export default NewPost;
