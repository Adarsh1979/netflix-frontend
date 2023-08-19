import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import {API_URL} from "../../baseUrl";

function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState("horror");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const newUrl = type
          ? `${API_URL}/lists?type=${type}${genre ? "&genre=" + genre : ""}`
          : `${API_URL}/lists`;
        const res = await axios.get(newUrl, {
          headers: { Token: `Bearer ${user.accessToken}` },
        });
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
}

export default Home;
