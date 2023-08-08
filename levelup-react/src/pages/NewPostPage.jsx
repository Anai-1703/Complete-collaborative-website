
import  NewPostForm  from '../forms/NewPostForm';


const NewPostPage = () => {
  const handleClose = () => {
    // Aquí puedes agregar la lógica para cerrar la página o hacer alguna otra acción
  };

  return (
    <main>
      <NewPostForm onClose={handleClose} />
    </main>
  );
};

export default NewPostPage;
