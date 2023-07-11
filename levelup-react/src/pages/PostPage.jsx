import { usePosts } from "../hooks/usePosts"

export function PostPage() {
    const { posts, loading, error } = usePosts()

    if(loading) {
        return (<>
        <p>Leveling Posts...</p>
        <img src="../assets/gif/loading.gif"></img>
        </>)
    }
    if (error) return <p>Ha habido un error... LeveL Down!</p>

    console.log(posts);
    return (
        <>
            <h3>Listado de Posts</h3>
        </>
    )
}