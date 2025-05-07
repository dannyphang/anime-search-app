import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";
import "./anime-card.css";

interface AnimeProps {
    anime: any;
}

const AnimeCard = (prop: { anime: any }) => {
    return (
        <Card className="anime-card-div">
            <CardMedia sx={{ height: 140 }} image={prop.anime.image_url} title={prop.anime.title} />
            <CardContent>
                <Typography gutterBottom component="div">
                    {prop.anime.title}
                </Typography>
            </CardContent>
        </Card>
    );
};
export default AnimeCard;
