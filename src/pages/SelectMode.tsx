import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";
import './SelectMode.scss';

const SelectMode = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const mode = dark ? 'DARK' : 'LIGHT';

  const submitSurvey = async () => {
    const response = await axios.post(`http://3.39.156.232:8080/survey/ui-mode`, {
      preferredUiMode: mode
    });
    console.log(response);
  };

  const submitButtonHandler = () => {
    submitSurvey();
    navigate('/statics');
  };

  return <div className={classNames("home", { dark, light: !dark })}>
    <img
      onClick={() => { setDark(!dark); }}
      src="https://cdn-icons-png.flaticon.com/512/1281/1281189.png"
      alt="darkmode-button"
      className="home-switch"
    />
    <h3 className={classNames("home-title")}>아이콘을 눌러 눈이 더 편한 모드를 선택후 제출해주세요</h3>
    <button onClick={submitButtonHandler} className={classNames("home-startbutton")}>
      <div>{dark ? `다크모드 제출하기` : `라이트모드 제출하기`}</div>
      <div>✔</div>
    </button>
  </div>;
};

export default SelectMode;