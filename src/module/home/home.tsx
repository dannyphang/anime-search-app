import { useEffect, useState } from "react";
import InputBase from "../../core/shared/component/input/input";
import { getAllAnime, searchAnime } from "../../core/service/animeService";
import "./home.css";
import AnimeCard from "../../core/shared/component/anime-card/anime-card";
import Toast from "../../core/shared/component/toast/toast";
import NoRecordFound from "../../core/shared/component/no-record-found/no-record-found";
import { useNavigate, useLocation } from "react-router-dom";
import { LinearProgress, Pagination } from "@mui/material";
import { Search } from "@mui/icons-material";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchText, setSearchText] = useState<string>(""); // For binding input
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>(""); // For debounced API call
  const [pagination, setPagination] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [emptyRecord, setEmptyRecord] = useState<boolean>(false);

  // Initialize from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";
    const pageParam = parseInt(queryParams.get("page") || "1");

    if (query !== searchText) setSearchText(query);
    if (pageParam !== page) setPage(pageParam);
  }, [location.search]);

  // Update URL on debounced search or page changes
  useEffect(() => {
    navigate(`?q=${searchText}&page=${page}`);
  }, [searchText, page]);

  // Fetch anime data when debouncedSearchText or page changes
  useEffect(() => {
    const handler = setTimeout(() => {
      // setAnimeList([]);
      fetchAnimeWithQuery(searchText, page);
    }, 250);

    return () => clearTimeout(handler);
  }, [searchText, page]);

  const fetchAnimeWithQuery = async (q: string, page: number) => {
    try {
      setLoading(true);
      let data = q || page ? await searchAnime({ q, page }) : await getAllAnime();

      if (data?.data?.length > 0) {
        // Remove duplicates by mal_id
        const uniqueAnime = data.data.filter(
          (anime: any, index: any, self: any) =>
            index === self.findIndex((a: any) => a.mal_id === anime.mal_id)
        );

        setAnimeList(uniqueAnime);
        setPagination(data.pagination || {});
        setEmptyRecord(false);
      } else {
        setAnimeList([]);
        setEmptyRecord(true);
        setToastMessage("No records found");
        setShowToast(true);
      }
    } catch (err) {
      setEmptyRecord(true);
      setToastMessage("Failed to fetch anime data");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value); // Update searchText immediately to reflect in the input
    setPage(1); // Reset page when search changes
  };

  const handlePageTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPage(Number(value) || 1); // Ensure valid page number
  };

  const handleClearSearch = () => {
    setSearchText("");
    setPage(1);
  };

  const handleAnimeClick = (anime: any) => {
    navigate(`/anime/${anime.mal_id}`);
  };

  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="home-page">
      {loading && <LinearProgress />}
      <div className="search-div">
        <InputBase
          placeholder="Search"
          onChange={handleTextChange}
          value={searchText} // Directly bind to searchText to reflect in the input
          endIcon={<Search />}
        />
      </div>

      <div className="anime-list-div">
        {!emptyRecord ? (
          <div className="anime-listing-div">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--content-gap-xxl)",
                justifyContent: "center",
              }}>
              {animeList.map((anime: any) => (
                <div
                  className="anime-card"
                  key={anime.mal_id}
                  onClick={() => handleAnimeClick(anime)}>
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
            <div className="pagination-div">
              <div style={{ display: "grid", alignItems: "center" }}>Go to </div>
              <InputBase
                value={page}
                onChange={handlePageTextChange}
                placeholder="Page"
                inputProps={{ classes: { root: "pageCss" } }}
              />
              <Pagination
                count={pagination.last_visible_page || 1}
                shape="rounded"
                page={page}
                onChange={handlePaginationChange}
              />
            </div>
          </div>
        ) : (
          <NoRecordFound clearSearchButtonOnClick={handleClearSearch} />
        )}
      </div>

      <Toast
        open={showToast}
        message={toastMessage}
        severity="error"
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default Home;
