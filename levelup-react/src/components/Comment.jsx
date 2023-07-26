import PropTypes from 'prop-types';
export default function Comment({ comment, userAvatar }) {
  return (
    <div  className="comment">
      <img src={userAvatar} alt="Avatar" className="avatar" />
      <p className="comment-text">{comment}</p>
    </div>
  );
};
  
