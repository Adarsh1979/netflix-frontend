import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../baseUrl";

function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const newUrl = type
          ? `${API_URL}/movies/random?type=${type}`
          : `${API_URL}/movies/random`;
        const res = await axios.get(newUrl, {
          headers: { Token: `Bearer ${user.accessToken}` },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type, user.accessToken]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="history">Historical</option>
            <option value="horror">Horror</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="featured-img"></img>

      <div className="info">
        <img src={content.imgTitle} alt="title-img"></img>
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link to={`/watch?movie=${content._id}`}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
