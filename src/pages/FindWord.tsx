import classNames from "classnames";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./FindWord.scss";
import { useNavigate } from "react-router-dom";

interface Text {
  text: string,
  word: string
}

const FindWord = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [sequence, setSequence] = useState(0);
  const [textArray, setTextArray] = useState<any>();
  const [isEnterd, setIsEntered] = useState(false);
  const [answer, setAnswer] = useState<any>([0, 0, 0, 0]);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerList, setTimerList] = useState<number[]>([]);
  const sunIcon = <img className="icon" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="sun" />
  const moonIcon = <img className="icon" src="https://cdn-icons-png.flaticon.com/512/1281/1281189.png" alt="moon" />
  const icon = mode ? moonIcon : sunIcon;


  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setTimer(timer + 1);
      }, 100);
    }
    if (timer === 0 && !started) {
      setTimeout(() => {
        setTimer(0);
      }, 100);
    }
    console.log(timer);
  }, [timer, started]);

  useEffect(() => {
    getText();
  }, []);

  const getText = async () => {
    const response = await axios.get(`http://3.39.156.232:8080/finding-word`);
    console.log(response);
    setTextArray(response.data.data);
  };

  const submitAnswerHandler = () => {
    setMode(!mode);
    setAnswer((prev: number[]) => {
      let tmp = prev;
      tmp[sequence] = Number(input);
      return tmp;
    })
    setStarted(false);
    setTimerList((prev) => {
      const temp = prev;
      temp[sequence] = timer;
      return temp;
    });
    setSequence(sequence + 1);
    console.log(timer);
    setTimer(0);

  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length)
      setIsEntered(true);
  };

  const finalSubmitHandler = async () => {
    const response = await axios.post(`http://3.39.156.232:8080/finding-word`, {
      answers: [
        {
          findingWordId: textArray[0].findingWordId,
          answer: answer[0],
          uiMode: 'LIGHT',
          estimatedSeconds: timerList[0]
        },
        {
          findingWordId: textArray[1].findingWordId,
          answer: answer[1],
          uiMode: 'DARK',
          estimatedSeconds: timerList[1]
        },
        {
          findingWordId: textArray[2].findingWordId,
          answer: answer[2],
          uiMode: 'LIGHT',
          estimatedSeconds: timerList[2]
        },
        {
          findingWordId: textArray[3].findingWordId,
          answer: answer[3],
          uiMode: 'DARK',
          estimatedSeconds: timerList[3]
        },
      ]
    });
    console.log(response);
  };

  if (sequence === 4) {
    finalSubmitHandler();
    navigate('/catch-word');
  }

  return <div className={classNames("findword", { dark: mode, light: !mode })}>

    <div className="padding-wrapper">
      {textArray && <h2 className="findword-question">{`'${textArray[sequence].word}'(이)라는 단어가 총 몇 번 나오나요?`}</h2>}
      {started ? <div className="flex-wrapper">
        <div className="findword-text">
          <p className="findword-text-p">
            {textArray[sequence].text}
          </p>
        </div>
        <div className="findword-answer">
          <input className="findword-answer-input" placeholder="정답" type="number" onChange={onChangeHandler}></input>
          <button className="findword-answer-next" disabled={!isEnterd} onClick={submitAnswerHandler}>{`>`}</button>
        </div>
      </div> : <button className="findword-start" onClick={() => { setStarted(true) }}>시작</button>}
    </div>
  </div>
};

export default FindWord;