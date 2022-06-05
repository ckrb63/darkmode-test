import axios from "axios";
import React, { useEffect, useState } from "react";
import './Statics.scss';

const Statics = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [darkStats, setDarkStats] = useState({
    findingWord: {
      time: 0,
      correctRate: 0,
    },
    catchingWord: {
      correctRate: 0,
    }
  });

  const [lightStats, setLightStats] = useState({
    findingWord: {
      time: 0,
      correctRate: 0,
    },
    catchingWord: {
      correctRate: 0,
    }
  });

  useEffect(() => {
    loadingFunction();
  }, []);

  const loadingFunction = async () => {
    setIsLoading(true);
    await getFindingWordStatics();
    await getCatchingWordStatics();
    setIsLoading(false);
  };

  const getFindingWordStatics = async () => {
    const response = await axios.get(`http://3.39.156.232:8080/stats/finding-word`);
    const { statsPerQuestion } = response.data.data;
    let darkTotalTime = 0, darkCorrectNum = 0, darkTotalNum = 0;
    let lightTotalTime = 0, lightCorrectNum = 0, lightTotalNum = 0;
    statsPerQuestion.map((stat: any) => {
      if (stat.uiMode === "DARK") {
        darkTotalTime += stat.totalSeconds;
        darkCorrectNum += stat.correctNum;
        darkTotalNum += stat.totalNum;
      } else if (stat.uiMode === "LIGHT") {
        lightTotalTime += stat.totalSeconds;
        lightCorrectNum += stat.correctNum;
        lightTotalNum += stat.totalNum;
      } else {
        console.log('error occured!')
      }
      return stat;
    });

    const darkTime = darkTotalTime / darkTotalNum;
    const darkCorrectRate = (darkCorrectNum / darkTotalNum) * 100;
    const lightTime = lightTotalTime / lightTotalNum;
    const lightCorrectRate = (lightCorrectNum / lightTotalNum) * 100;

    setDarkStats((prev) => {
      const temp = prev;
      temp.findingWord.time = darkTime;
      temp.findingWord.correctRate = darkCorrectRate;
      return temp;
    })

    setLightStats((prev) => {
      const temp = prev;
      temp.findingWord.time = lightTime;
      temp.findingWord.correctRate = lightCorrectRate;
      return temp;
    });

    console.log(response);
  };
  const getCatchingWordStatics = async () => {
    const response = await axios.get(`http://3.39.156.232:8080/stats/catching-word`);
    const { statsPerQuestion } = response.data.data;
    let darkCorrectNum = 0, darkTotalNum = 0;
    let lightCorrectNum = 0, lightTotalNum = 0;
    console.log(response);
    statsPerQuestion.map((stat: any) => {
      if (stat.uiMode === "DARK") {
        darkCorrectNum += stat.correctNum;
        darkTotalNum += stat.totalNum;
      } else if (stat.uiMode === "LIGHT") {
        lightCorrectNum += stat.correctNum;
        lightTotalNum += stat.totalNum;
      } else {
        console.log('error occured!')
      }
      return stat;
    });

    const darkCorrectRate = (darkCorrectNum / darkTotalNum) * 100;
    const lightCorrectRate = (lightCorrectNum / lightTotalNum) * 100;

    setDarkStats((prev) => {
      const temp = prev;
      temp.catchingWord.correctRate = darkCorrectRate;
      return temp;
    })

    setLightStats((prev) => {
      const temp = prev;
      temp.catchingWord.correctRate = lightCorrectRate;
      return temp;
    });

  };
  console.log(darkStats);
  console.log(lightStats);

  const context = <div className="statics-context">
    <h1 className="statics-title">전체 사용자 통계</h1>
    <div className="statics-dark">
      <div className="statics-dark-title">다크모드</div>
      <div className="statics-dark-wrapper">
        <div className="statics-dark-label">소요 시간</div>
        <div className="statics-dark-data">{darkStats.findingWord.time.toFixed(2)}초</div>
      </div>
      <div className="statics-dark-wrapper">
        <div className="statics-dark-label">가독성 테스트(속도) 1 정답률</div>
        <div className="statics-dark-data">{darkStats.findingWord.correctRate.toFixed(2)}%</div>
      </div>
      <div className="statics-dark-wrapper">
        <div className="statics-dark-label">가독성 테스트(정확도) 2 정답률</div>
        <div className="statics-dark-data">{darkStats.catchingWord.correctRate.toFixed(2)}%</div>
      </div>
    </div>
    <div className="statics-light">
      <div className="statics-light-title">라이트모드</div>
      <div className="statics-light-wrapper">
        <div className="statics-light-label">소요 시간</div>
        <div className="statics-light-data">{lightStats.findingWord.time.toFixed(2)}초</div>
      </div>
      <div className="statics-light-wrapper">
        <div className="statics-light-label">가독성 테스트(속도) 1 정답률</div>
        <div className="statics-light-data">{lightStats.findingWord.correctRate.toFixed(2)}%</div>
      </div>
      <div className="statics-light-wrapper">
        <div className="statics-light-label">가독성 테스트(정확도) 2 정답률</div>
        <div className="statics-light-data">{lightStats.catchingWord.correctRate.toFixed(2)}%</div>
      </div>
    </div>
  </div>

  return <div className="statics">
    {isLoading ? <div className="loading">잠시만 기다려주세요</div> : context}
  </div>
};

export default Statics;