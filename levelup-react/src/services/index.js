/* Aquí se crean todas las comunicaciones con la BBDD */

export const getAllPostsService = async () => {
    const response = await fetch(`${import.meta.env.REACT_APP_BACKEND}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};
