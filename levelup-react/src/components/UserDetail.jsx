
import { Link } from "react-router-dom";
import { DefaultAvatar } from "./DefaultAvatar.jsx";


function UserDetail({post}) {

    return(
        <>
            <section className="user-detail-full">
                <Link className="link-to-user" to={`/users/${post.data.idUser}`}>
                    {post.avatarURL ? (
                    <img className="user-avatar-full" src={post.data.avatarURL} alt="Avatar" />
                    ) : (
                    <DefaultAvatar post={false} />
                    )}
                    <span className="user-name-full">{post.data.nameMember}</span>
                </Link>
            </section>

        </>
    )
}

export default UserDetail;