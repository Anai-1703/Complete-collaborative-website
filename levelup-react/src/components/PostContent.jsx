export function PostContent ({ photos, intro, description }) {

    // Componente que muestra las fotos, la entradilla y la descripción del post

    return (
        <>
            {/* Aquí muestra las fotos del post */}
            <figure className="post-images">
                {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Photo ${index + 1}`} />
                ))}
            </figure>
            <div className="post-text">
                <p>{intro}</p>
                <p>{description}</p>
            </div>
        </>
        );
}
