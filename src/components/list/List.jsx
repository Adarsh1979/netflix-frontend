import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideCount, setSlideCount] = useState(0);
  const [clickLimit] = useState(window.innerWidth / 225);

  const listRef = useRef();

  const handleClick = (direction) => {
    console.log(
      "dist from viewport is: " + listRef.current.getBoundingClientRect().x
    );
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    setTimeout(() => {
      console.log(listRef.current.getBoundingClientRect().x);
    }, 2000);
    if (direction === "left" && slideCount > 0) {
      setSlideCount(slideCount - 1);
      listRef.current.style.transform = `translateX(${235 + distance}px)`;
    }

    if (direction === "right" && slideCount < 10 - clickLimit) {
      setSlideCount(slideCount + 1);
      listRef.current.style.transform = `translateX(${-235 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosNewOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: (!isMoved || slideCount <= 0) && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem key={i} index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default List;
