import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import classNames from "classnames";

const Home = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  return <div className={classNames("home", { dark, light: !dark })}>
    <img
      onClick={() => { setDark(!dark); }}
      src="https://cdn-icons-png.flaticon.com/512/1281/1281189.png"
      alt="darkmode-button"
      className="home-switch"
    />
    <h1 className={classNames("home-title")}>다크모드 테스트</h1>
    <button onClick={() => { navigate('/find-word') }} className={classNames("home-startbutton")}>시작하기</button>
  </div>;
};
export default Home;