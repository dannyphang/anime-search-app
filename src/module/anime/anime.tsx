import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./anime.css";
import { getAnimeDetails } from "../../core/service/animeService";
import { LinearProgress } from "@mui/material";

function Anime() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const data = await getAnimeDetails(id!);
        if (data) {
          setAnime(data.data);
        } else {
          setToastMessage("No records found");
          setShowToast(true);
        }
      } catch (err: any) {
        setError(err.message);
        setToastMessage(err.message);
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  const flattened = flattenObject(anime);

  const selectedEntries: [string, string | number][] = Object.entries(displayKeys).map(
    ([keyPath, label]) => {
      let value: any;

      if (keyPath === "studios") {
        value = anime?.studios?.map((studio: any) => studio.name).join(", ") || "—";
      } else if (keyPath === "producers") {
        value = anime?.producers?.map((producer: any) => producer.name).join(", ") || "—";
      } else if (keyPath === "genres") {
        value = anime?.genres?.map((genres: any) => genres.name).join(", ") || "—";
      } else {
        value = flattened[keyPath];
        value = Array.isArray(value) ? value.join(", ") : String(value ?? "—");
      }

      return [label, value];
    }
  );

  const columns = splitIntoColumns(selectedEntries, 4);

  return (
    <div className="anime-detail-container">
      {loading && <LinearProgress />}
      <div className="anime-detail-top">
        <section className="trailer-div" style={{ minHeight: "200px" }}>
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
          <img className="an-image" src={anime?.images?.jpg?.image_url} alt={anime?.title} />
          <h1 className="an-title">
            {anime?.title}
            {anime?.title_japanese ? ` (${anime?.title_japanese})` : null}
          </h1>
          <div className="an-synopsis">{anime?.synopsis}</div>
        </div>
      </div>

      <section className="detail-div" style={{ display: "flex", gap: "2rem" }}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} style={{ flex: 1 }}>
            {col.map(([label, value], rowIndex) => (
              <div key={rowIndex} style={{ marginBottom: "var(--content-gap)", display: "grid" }}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        ))}
      </section>

      {anime?.background && (
        <section className="background-div">
          <h2>Background</h2>
          <p>{anime?.background}</p>
        </section>
      )}
    </div>
  );
}

function flattenObject(obj: any, parentKey = "", result: any = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenObject(value, fullKey, result);
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

function splitIntoColumns(
  data: [string, string | number][],
  numCols: number
): Array<[string, string | number][]> {
  const rowsPerCol = Math.ceil(data.length / numCols);
  const columns: Array<[string, string | number][]> = Array.from({ length: numCols }, (_, i) =>
    data.slice(i * rowsPerCol, (i + 1) * rowsPerCol)
  );
  return columns;
}

const displayKeys: Record<string, string> = {
  type: "Type",
  producers: "Producers",
  studios: "Studios",
  source: "Source Material",
  status: "Airing Status",
  episodes: "Episode Count",
  score: "Rating Score",
  rank: "Rank",
  popularity: "Popularity",
  duration: "Duration",
  rating: "Age Rating",
  "aired.string": "Aired",
  "broadcast.string": "Broadcast Time",
  title_synonyms: "Synonyms",
  genres: "Genres",
};

export default Anime;
