export function Comments({ comments }) {

    return (
        <>
            {/* Aquí se muestran los comentarios del post */}
            {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
            ))}
        </>
        );
}