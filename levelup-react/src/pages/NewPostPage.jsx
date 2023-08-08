
import  NewPostForm  from '../forms/NewPostForm';


const NewPostPage = () => {
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
