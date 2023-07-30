import '../index.css';
import { NewPostForm } from '../forms/NewPostForm';

const NewPost = () => {
    // Elimina todo lo relacionado con el modal

    const handleNewPostClick = () => {
        // Elimina todo lo relacionado con el modal
    };
  
    return (
        <div>
            <h2>New post page</h2>
            <button onClick={handleNewPostClick}>New Post</button>

            {/* Renderiza directamente el formulario NewPostForm */}
            <NewPostForm/>
        </div>
    );
};

export default NewPost;