import ButtonBase from "../button/button";
import notFoundPng from "../../../../assets/image/NoSearchResults.png";
import "./no-record-found.css";

const NoRecordFound = (prop: { clearSearchButtonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (prop.clearSearchButtonOnClick) {
            prop.clearSearchButtonOnClick(event);
        }
    };
    return (
        <div className="no-record-found-div">
            <div className="no-record-found-image-div">
                <img src={notFoundPng} alt="No Record Found" className="no-record-found-image" />
            </div>
            <h2 className="no-record-found-text">No results found for your search</h2>
            <p>Try adjusting your search to find what youare looking for.</p>
            <div className="no-record-found-button-div">
                <ButtonBase label="Clear search" onClick={handleClick} />
            </div>
        </div>
    );
};
export default NoRecordFound;
