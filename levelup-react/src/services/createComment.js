import { fetchAPI } from './fetchAPI';
import { getUser } from './getUser';
const host= import.meta.env.VITE_API_HOST;
console.log(host);
export async function createComment(postId, newComment) {
  try { 
    const token = getUser;
console.log(token);
    // Llamar a la función fetchAPI con el método 'post' y enviar el nuevo comentario al servidor
    const payload = { comment: newComment }; // Crear el objeto payload con el nuevo comentario
    const result = await fetchAPI(`/posts/${postId}/comments`, 'post', payload, token); // Usar postId para formar la ruta correcta
  
  return result;
}  catch (error) {
   // Manejar errores en caso de que la solicitud falle
   console.error("Error al crear el comentario:", error);
   throw error;
}
}