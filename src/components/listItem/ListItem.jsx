import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined, } from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./listItem.scss";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import {API_URL} from "../../baseUrl";

function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});
    const {user} = useContext(AuthContext);
    
    useEffect(() => {
        
        const getMovie = async () => {
            try {
                const res = await axios.get(`${API_URL}/movies/find/${item}`, {
                    headers: { Token: `Bearer ${user.accessToken}` },
                  });
                setMovie(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMovie();
    }, [item])
    
    const movieParam = encodeURIComponent(item);

    return (

        <Link to={`/watch?movie=${movieParam}`}>
            <div
                className="listItem"
                style={{ left: isHovered && index * 225 - 50 + index * 5 }}
                onMouseEnter={() => {
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                }}>
                <img src={movie.img} alt={movie.title} />

                {isHovered && (
                    <>
                        <video src={movie.trailer} autoPlay={true} loop />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon" />
                                <Add className="icon" />
                                <ThumbUpAltOutlined className="icon" />
                                <ThumbDownAltOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{movie.title}</span>
                                <span className="limit">{movie.limit}</span>
                                <span>{movie.year}</span>
                                <div className="genre">{movie.genre}</div>
                            </div>
                            <div className="desc">
                                {movie.desc}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
}

export default ListItem;
