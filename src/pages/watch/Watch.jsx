import { ArrowBack } from "@mui/icons-material";
import "./watch.scss";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import {API_URL} from "../../baseUrl";

function Watch() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const movieId = searchParams.get('movie');
    const [movie, setMovie] = useState({});
    const {user} = useContext(AuthContext);

    const getMovie = async () => {
        try {
            const res = await axios.get(`${API_URL}/movies/find/${movieId}`, {
                headers: { Token: `Bearer ${user.accessToken}` },
              });
            setMovie(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    getMovie();
    
	return (
		<div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBack />
                    Home
                </div>
            </Link>
			<video
				className="video" autoPlay progress controls
				src={movie.trailer}
			/>
		</div>
	);
}

export default Watch;
