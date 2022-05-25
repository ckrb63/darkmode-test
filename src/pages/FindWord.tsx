import classNames from "classnames";
import React, { useState } from "react";
import "./FindWord.scss";

const textArray = [`이 책을 어른에게 바치는데 대하여 어린이들에게 용서를 빈다. 여기에는
중요한 이유가 있다.그것은 이 어른이 세상에서 나와 가장 친한 친구라는
것이다.또 다른 한 이유는 이 어른이 나의 모든 점을 이해할 수 있고
어린이들을 위해 씌어진 책들까지도 이해할 수 있다는 것이다.세 번째
이유는 이 어른이 프랑스에서 살고 있는데 그곳에서 그는 굶주리고 추위에
떨고 있다는 것이다.이 어른을 잘 위로해 주어야 한다.만일 이 모든
이유가 충분하지 않다면 나는 이 책을 이 어른이 옛날 어린이로 있던
시절에 기꺼이 바치고 싶다.모든 어른들은 어린이였다.그래서 나는
헌사를 이렇게 고쳐 쓴다.`, `수많은 인코딩들이 제한된 문자열들만을 보유하고 있기 때문에 
제한된 하위 집합의 인간 언어로 텍스트를 표현할 때에만 종종 유용하다. 
유니코드는 알려진 모든 언어를 대표하기 위한 공통 표준을 만드는 시도로
 볼 수 있으며, 알려진 대부분의 문자 집합들이 매우 큰 유니코드 문자 
 집합의 하위 집합에 속해있다. 유니코드를 위한 복수의 문자 인코딩이 
 있지만, 가장 흔한 것은 UTF-8이며, ASCII와 하위 호환된다는 장점이 
 있다. 즉, 비슷한 의미로 모든 ASCII 텍스트 파일은 UTF-8 텍스트 
 파일이기도 하다.`];

const wordArray = ['그림', '미술'];

const FindWord = () => {
  const [mode, setMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [sequence, setSequence] = useState(0);
  const sunIcon = <img className="icon" src="https://cdn-icons-png.flaticon.com/512/169/169367.png" alt="sun" />
  const moonIcon = <img className="icon" src="https://cdn-icons-png.flaticon.com/512/1281/1281189.png" alt="moon" />

  const icon = mode ? moonIcon : sunIcon;

  const submitAnswerHandler = () => {
    setMode(!mode);
    setSequence(sequence + 1);
    setStarted(false);
  };

  return <div className={classNames("findword", { dark: mode, light: !mode })}>

    <div className="padding-wrapper">
      <h1 className="findword-question">{`'${wordArray[sequence]}'(이)라는 단어가 총 몇 번 나오나요?`}</h1>
      {started ? <div className="flex-wrapper">
        <div className="findword-text">
          <p className="findword-text-p">
            {textArray[sequence]}
          </p>
        </div>
        <div className="findword-answer">
          <input className="findword-answer-input" placeholder="정답" type="number"></input>
          <button className="findword-answer-next" onClick={submitAnswerHandler}>{`>`}</button>
        </div>
      </div> : <button onClick={() => { setStarted(true) }}>시작</button>}
    </div>
  </div>
};

export default FindWord;