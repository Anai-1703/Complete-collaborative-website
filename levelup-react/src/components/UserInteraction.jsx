import { sendVote } from '../services/sendVote';
import { useState } from "react";
// import { Link } from "react-router-dom";
import '../styles/UserInteraction.css';

export function UserInteraction({
  postId,
  initialUpvotes,
  initialDownvotes,
  updatePostVotes,
  }) {
    const [upvotes, setUpvotes] = useState(Number(initialUpvotes) || 0);
    const [downvotes, setDownvotes] = useState(Number(initialDownvotes) || 0);

    const handleVote = async (voteType) => {
      try {
          const response = await sendVote(postId, voteType);
          if (response.success) {
              const { upvotes, downvotes } = response.data;
              setUpvotes(Number(upvotes));
              setDownvotes(Number(downvotes));
              updatePostVotes(postId, upvotes, downvotes);
          }
      } catch (error) {
          console.error("Error al enviar el voto:", error);
      }
  };


  return (
    <>
      <div className="votes">
      <span>{upvotes}</span>
        <svg className="up-vote-btn"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleVote(true)} // Voto positivo
        >
          <path
            d="M12.0321 1.01712L7.75751 5.22761L9.161 6.65246L11.0197 4.82165L10.9644 22.9768L12.9644 22.9829L13.0195 4.86974L14.8177 6.69525L16.2425 5.29175L12.0321 1.01712Z"
            fill="green"
          />
        </svg>
        <span>{downvotes}</span>
        <svg className="down-vote-btn"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleVote(false)} // Voto negativo
        >
          <path
            d="M13.0125 19.162L14.8246 17.3398L16.2427 18.7501L12.012 23.0046L7.75726 18.7739L9.16751 17.3557L11.0126 19.1905L10.998 0.997021L12.998 0.995422L13.0125 19.162Z"
            fill="red"
          />
        </svg>
      </div>
    </>
  );
}
