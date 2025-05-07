import { useEffect, useState } from "react";
import InputBase from "../../core/shared/component/input/input";
import { getAllAnime, searchAnime } from "../../core/service/animeService";
import "./home.css";
import AnimeCard from "../../core/shared/component/anime-card/anime-card";
import Toast from "../../core/shared/component/toast/toast";
import NoRecordFound from "../../core/shared/component/no-record-found/no-record-found";
import animeData from "../../assets/anime.json";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

function Home() {
    const navigate = useNavigate();
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [searchText, setSearchText] = useState<string>("");
    let emptyRecord: boolean = false;

    useEffect(() => {
        const fetchAnime = async () => {
            setLoading(true);
            try {
                const data = await getAllAnime();
                if (data) {
                    setAnimeList(data.data);
                } else {
                    emptyRecord = true;
                    setToastMessage("No records found");
                    setShowToast(true);
                }
            } catch (err: any) {
                setAnimeList(animeData.data as any);
                console.log(animeData);
                // setError(err.message);
                // setToastMessage(err.message);
                // setShowToast(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchText(searchText);

            setLoading(true);
            const fetchAnimeWithQuert = async () => {
                try {
                    const data = await searchAnime(searchText);
                    if (data) {
                        setAnimeList(data.data);
                    } else {
                        emptyRecord = true;
                        setToastMessage("No records found");
                        setShowToast(true);
                    }
                } catch (err: any) {
                    setAnimeList(animeData.data as any);

                    let tempList = animeData.data.filter((anime: any) => {
                        return anime.title.toLowerCase().includes(searchText.toLowerCase());
                    });
                    if (tempList.length > 0) {
                        setAnimeList(tempList as any);
                    } else {
                        emptyRecord = true;
                        setToastMessage("No records found");
                        setShowToast(true);
                    }
                    setLoading(false);
                } finally {
                    setLoading(false);
                }
            };
            fetchAnimeWithQuert();
        }, 1000); // 1s debounce

        return () => {
            clearTimeout(handler); // cancel previous timeout on new keystroke
        };
    }, [searchText]);

    const handleTextChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchText("");
    };

    const handleAnimeClick = (anime: any) => {
        // navigate to anime details page
        navigate(`/anime/${anime.mal_id}`);
    };

    return (
        <div className="">
            {loading && <LinearProgress />}
            <InputBase placeholder="Search" onChange={handleTextChange} value={searchText} />
            <div className="anime-list-div">
                {!emptyRecord ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--content-gap)", justifyContent: "center" }}>
                        {animeList.map((anime: any) => {
                            return (
                                <div className="anime-card" key={anime.mal_id} onClick={() => handleAnimeClick(anime)}>
                                    <AnimeCard anime={anime} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <NoRecordFound clearSearchButtonOnClick={handleClearSearch} />
                )}
            </div>

            <Toast open={showToast} message={toastMessage} severity="error" onClose={() => setShowToast(false)} />
        </div>
    );
}
export default Home;
