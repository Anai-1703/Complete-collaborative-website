
import { Link } from "react-router-dom";
import { DefaultAvatar } from "./DefaultAvatar.jsx";


function UserDetail({ post, className1, className2, className3, size }) {
    return(
        <section className={className1}>
            <Link className="link-to-user" to={`/users/${post.idUser}`}>
                {post.avatarURL ? (
                <img className={className2} src={post.avatarURL} alt="Avatar" />
                ) : (
                <DefaultAvatar size={size} />
                )}
                <span className={className3}>{post.nameMember}</span>
            </Link>
        </section>
    )
}

export default UserDetail;