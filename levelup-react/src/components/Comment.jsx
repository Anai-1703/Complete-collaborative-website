
export default function Comment({ comment, userAvatar, userName }) {
  return (
    <div  className="comment">
      <img src={userAvatar} alt="Avatar" className="avatar" />
      <p className="comment-text">{comment}</p>
    </div>
  );
}
  
