import { useState } from "react";


function PostDate({post}) {
    const [showFullDate, setShowFullDate] = useState(false);

    const formatDate = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();
    
        const timeDiffInMinutes = Math.floor((now - postDate) / (1000 * 60));
        const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
        const timeDiffInDays = Math.floor(timeDiffInHours / 24);
    
        if (timeDiffInMinutes < 5) {
            return 'hace un momento';
        } else if (timeDiffInMinutes < 60) {
            return `hace ${timeDiffInMinutes} ${timeDiffInMinutes === 1 ? 'minuto' : 'minutos'}`;
        } else if (timeDiffInHours < 24) {
            return `hace ${timeDiffInHours} ${timeDiffInHours === 1 ? 'hora' : 'horas'}`;
        } else if (timeDiffInDays < 5) {
            return `hace ${timeDiffInDays} ${timeDiffInDays === 1 ? 'día' : 'días'}`;
        } else {
            return postDate.toLocaleDateString('es-ES');
        }
    };
    

    const formattedDate = formatDate(post.createdAt);
    const fullDate = new Date(post.createdAt).toLocaleString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    const handleMouseEnter = () => {
        setShowFullDate(true);
    };
    
    const handleMouseLeave = () => {
        setShowFullDate(false);
    };
    return(
        <section className="post-date-full">
            <p
            className="post-created-full"
            title={showFullDate ? fullDate : null}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            {formattedDate}
            </p>
        </section>
    )
}

export default PostDate;