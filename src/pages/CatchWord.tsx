import React, { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import './CatchWord.scss';
import { useNavigate } from "react-router-dom";

interface CatchWord {
  id: number,
  word: string
}

const CatchWord = () => {
  const [mode, setMode] = useState(false);
  const [sequence, setSequence] = useState(0);
  const [catchWordList, setCatchWordList] = useState<CatchWord[]>([]);
  const [flash, setFlash] = useState(true);
  const [input, setInput] = useState('');
  const [isEnterd, setIsEntered] = useState(false);
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState(['', '', '', '', '', '', '', '']);
  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getCatchWordList();
  }, []);

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setFlash(false);
      }, 1000);
    }
  }, [flash, started]);

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setCanSubmit(true);
      }, 2000)
    }
  }, [sequence, started])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length)
      setIsEntered(true);
    else
      setIsEntered(false);
  };


  const getCatchWordList = async () => {
    const response = await axios.get(`http://3.39.156.232:8080/catching-word`);
    setCatchWordList(response.data.data);
  };

  const submitAnswer = async () => {
    const response = await axios.post(`http://3.39.156.232:8080/catching-word`, {
      answers: [
        {
          catchingWordId: catchWordList[0].id,
          answer: answer[0],
          uiMode: "LIGHT",
        },
        {
          catchingWordId: catchWordList[1].id,
          answer: answer[1],
          uiMode: "LIGHT",
        },
        {
          catchingWordId: catchWordList[2].id,
          answer: answer[2],
          uiMode: "LIGHT",
        },
        {
          catchingWordId: catchWordList[3].id,
          answer: answer[3],
          uiMode: "LIGHT",
        },
        {
          catchingWordId: catchWordList[4].id,
          answer: answer[4],
          uiMode: "DARK",
        },
        {
          catchingWordId: catchWordList[5].id,
          answer: answer[5],
          uiMode: "DARK",
        },
        {
          catchingWordId: catchWordList[6].id,
          answer: answer[6],
          uiMode: "DARK",
        },
        {
          catchingWordId: catchWordList[7].id,
          answer: answer[7],
          uiMode: "DARK",
        },
      ]
    });
    const dataList: any[] = response.data.data.markings;
    let lightCounter = 0;
    let darkCounter = 0;
    dataList.map((marking, i) => {
      if (i <= 3 && marking.correct) {
        lightCounter += 1;
      }
      if (i <= 7 && i > 3 && marking.correct) {
        darkCounter += 1;
      }
    });
    localStorage.setItem('catchword-light-correct', lightCounter.toString());
    localStorage.setItem('catchword-dark-correct', darkCounter.toString());
  };

  const buttonClickHandler = () => {
    if (isEnterd) {
      setAnswer((prev) => {
        let tmp = prev;
        tmp[sequence] = input;
        return tmp;
      });

      setSequence(sequence + 1);
      setFlash(true);
      if (sequence === 3)
        setMode(!mode);
    }
    setInput('');
    setIsEntered(false);
    setCanSubmit(false);
  };


  if (sequence === 8) {
    submitAnswer();
    navigate('/select-mode');
  }

  const flashWord = <div className={classNames('catchword-word', { black: mode }, { flash })}>{catchWordList.length && catchWordList[sequence].word}</div>;
  return <div className={classNames("catchword")}>
    <h2>깜빡이는 단어를 적어주세요</h2>
    {started ? <><div className={classNames('catchword-background', { black: mode })}>
      {flashWord}
    </div>
      <div className="catchword-answer">
        <input className={classNames("catchword-answer-input", { invalid: !isEnterd })} placeholder="최대한 적어주세요" value={input} onChange={onChangeHandler}></input>
        <button className="catchword-answer-next" disabled={!isEnterd || !canSubmit} onClick={buttonClickHandler}>{canSubmit ? `>` : `...`}</button>
      </div></> : <button className="catchword-start" onClick={() => { setStarted(true); }}>시작</button>}
  </div>
};

export default CatchWord;