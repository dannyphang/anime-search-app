import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Tooltip,
} from "@mui/material";
import "./anime-card.css";

interface AnimeProps {
  anime: any;
}

const AnimeCard = (prop: { anime: any }) => {
  return (
    <Card className="anime-card-div">
      <CardMedia
        sx={{ width: 185, aspectRatio: "225/350" }}
        image={prop.anime.images.jpg.image_url}
        title={prop.anime.title}
      />
      <CardContent className="card-content-div">
        <Tooltip title={prop.anime.title} placement="top" arrow>
          <Typography gutterBottom component="div" className="card-title-div">
            {prop.anime.title}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};
export default AnimeCard;
