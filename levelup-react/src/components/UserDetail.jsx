
import { Link } from "react-router-dom";
import { DefaultAvatar } from "./DefaultAvatar.jsx";


function UserDetail({ post, userDetail, userAvatar, userName, size }) {
    return(
        <section className={userDetail}>
            <Link className="link-to-user" to={`/users/${post.idUser}`}>
                {post.avatarURL ? (
                <img className={userAvatar} src={post.avatarURL} alt="Avatar" />
                ) : (
                <DefaultAvatar size={size} />
                )}
                <span className={userName}>{post.nameMember}</span>
            </Link>
        </section>
    )
}

export default UserDetail;