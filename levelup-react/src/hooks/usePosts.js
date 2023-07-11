import { useEffect, useState } from "react";
import { getAllPostsService } from "../services";

export function usePosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);

                const data = await getAllPostsService();
                setPosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    return { posts, loading, error };
}
