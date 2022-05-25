import classNames from "classnames";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./FindWord.scss";

interface Text{
  text:string,
  word:string
}

const wordArray = ['그림', '미술'];

const FindWord = () => {
  const [mode, setMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [sequence, setSequence] = useState(0);
  const [textArray, setTextArray] = useState<any>();
  const [isEnterd, setIsEntered] = useState(false);
  const sunIcon = <img className="icon" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="sun" />
  const moonIcon = <img className="icon" src="https://cdn-icons-png.flaticon.com/512/1281/1281189.png" alt="moon" />
  const icon = mode ? moonIcon : sunIcon;

  useEffect(()=>{
    getText();
  },[]);

  const getText = async () => {
    const response = await axios.get(`http://172.30.1.60:8080/finding-word`);
    console.log(response);
    setTextArray(response.data.data);
  };

  const submitAnswerHandler = () => {
    setMode(!mode);
    setSequence(sequence + 1);
    setStarted(false);
  };

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if(e.target.value.length)
      setIsEntered(true);
  };

  const finalSubmitHandler = async () => {
    const response = await axios.post(`http://172.30.1.60:8080/finding-word`,{
      answers : [
        {
          findingWordId: 1,
          answer:7,
          uiMode:'DARK',
          estimatedSeconds:30
        },
        {
          findingWordId: 1,
          answer:7,
          uiMode:'DARK',
          estimatedSeconds:30
        },
        {
          findingWordId: 1,
          answer:7,
          uiMode:'DARK',
          estimatedSeconds:30
        },
        {
          findingWordId: 1,
          answer:7,
          uiMode:'DARK',
          estimatedSeconds:30
        },
      ]
    });
    console.log(response);
  };  

  return <div className={classNames("findword", { dark: mode, light: !mode })}>

    <div className="padding-wrapper">
      {textArray && <h1 className="findword-question">{`'${textArray[sequence].word}'(이)라는 단어가 총 몇 번 나오나요?`}</h1>}
      {started ? <div className="flex-wrapper">
        <div className="findword-text">
          <p className="findword-text-p">
            {textArray[sequence].text}
          </p>
        </div>
        <div className="findword-answer">
          <input className="findword-answer-input" placeholder="정답" type="number" onChange={onChangeHandler}></input>
          <button className="findword-answer-next" disabled={!isEnterd} onClick={sequence === 3 ? finalSubmitHandler : submitAnswerHandler}>{`>`}</button>
        </div>
      </div> : <button className="findword-start" onClick={() => { setStarted(true) }}>시작</button>}
    </div>
  </div>
};

export default FindWord;