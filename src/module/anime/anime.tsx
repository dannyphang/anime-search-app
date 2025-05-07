import { useParams } from "react-router-dom";
import animeData from "../../assets/anime.json";
import { useEffect, useState } from "react";
import "./anime.css";

function Anime() {
    const { id } = useParams<{ id: string }>();
    const [anime, setAnime] = useState<any>(null);

    useEffect(() => {
        const matchedAnime = animeData.data.find((a: any) => a.mal_id.toString() === id);
        console.log(matchedAnime);
        setAnime(matchedAnime);
    }, [id]);

    return (
        <div className="anime-detail-container">
            <section className="trailer-div">
                {anime?.trailer?.embed_url && (
                    <iframe
                        width="100%"
                        height="400"
                        src={anime.trailer.embed_url}
                        title="Anime Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                    />
                )}
            </section>
            <div className="title-div">
                <img className="an-image" src={anime?.images.jpg.image_url} />
                <div className="an-title">
                    {anime?.title}
                    {anime?.title_japanese ? ` (${anime?.title_japanese})` : null}
                </div>
                <div className="an-synopsis">{anime?.synopsis}</div>
            </div>
            <section className="actors-div">{/* Add actors or other info here if available in your JSON */}</section>
        </div>
    );
}

export default Anime;
