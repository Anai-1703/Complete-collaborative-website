



function Tags({categoriesLinks, platformsLinks}) {

    return(
        <section className="tags-full">
            <p className="tags-cat">Categorías: {categoriesLinks}</p>
            <p className="tags-plat">Plataformas: {platformsLinks}</p>
        </section>
    )
}

export default Tags;