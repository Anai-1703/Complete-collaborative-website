import { getToken } from "./token/getToken";

const host = import.meta.env.VITE_API_HOST;

export async function deleteComment(idPost, idComment) {
    try {
        const token = getToken();
        const response = await fetch(
            `${host}/posts/${idPost}/comments/${idComment}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            }
        );
        return response;
    } catch (err) {
        console.error(err);
    }
}
