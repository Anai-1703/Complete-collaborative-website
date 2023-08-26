import { useState } from 'react';
import  NewPostForm  from '../forms/NewPostForm';


const NewPostPage = () => {
  const [showErrorModal, setShowErrorModal] = useState (false);
  
  const handleClose = () => {
    setShowErrorModal(false); //añadido esto ahora
  };

  return (
    <main>
      <NewPostForm onClose={handleClose} />
    </main>
  );
};

export default NewPostPage;
