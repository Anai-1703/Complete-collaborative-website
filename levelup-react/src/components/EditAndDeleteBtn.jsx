import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { getUserToken } from "../services/token/getUserToken";

import EditForm from "../forms/EditForm";
import deletePost from "../services/deletePost";

function EditAndDeleteBtn({post}) {
    const [showControlPanel, setShowControlPanel] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [postData, setPostData] = useState(post.data);

    const { id } = useParams();

    const tokenInfo = getUserToken();
    const userIdFromToken = tokenInfo ? tokenInfo.id : null;
    const createdByUserId = post.data.idUser;
    const isCurrentUserPostCreator = userIdFromToken === createdByUserId;

    const handleEditClick = () => {
        if (isExpanded) {
            setShowControlPanel(false); // Contraer el formulario al hacer clic en "Contraer"
        } else {
            handleFormSubmit(postData); // Llamar a handleFormSubmit con los datos actuales antes de expandir el formulario
            setShowControlPanel(!showControlPanel); // Expandir el formulario al hacer clic en "Editar Post"
        }
        setIsExpanded(!isExpanded);
    } ;

    const handleFormSubmit = async (formData) => {
        try {
          setPostData({ ...post.data, ...formData }); // Actualizar solo el campo post.data con los datos editados
          setShowControlPanel(false); // Cerrar el formulario después de enviar los datos
        } catch (error) {
            console.error('Error al editar el post:', error.message);
        }
    };

    const handleDeleteClick = async () => {
        try {
            const postDeleted = await deletePost(id);
            <Navigate to="/" />
        } catch (error) {
            console.error("Error al eliminar el post:", error);
        }
    };


    return(
        <>
        {isCurrentUserPostCreator && (
            <section className="section-editpost">
                <button className="btn-editpost" onClick={handleEditClick}>
                    {isExpanded ? "Contraer" : "Editar Post"}
                </button>
                <button className="btn-deletepost" onClick={handleDeleteClick}>Delete</button>
            </section>
        )}

        <section className="contain-form">
            {showControlPanel && (
                <EditForm
                id={id}
                postData={post.data}
                onChange={handleFormSubmit}
                onEditClick={handleEditClick}
                handleEditClick={handleEditClick}
                />
            )}
        </section>
    </>)
    
}

export default EditAndDeleteBtn;