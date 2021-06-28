import React, { useState } from 'react'; //useStateをインポート
import Title from './components/Title';
import Form from './components/Form';
import Results from './components/Results';
import Loading from './components/Loading';
import Notice from './components/Notice';
import './App.css';

// 取得結果の型定義
export type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string  ;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false); //useStateで値とそれを更新する関数を返す
  const [isError, setError] = useState<boolean>(false);
  const [city, setCity] = useState<string>(""); //空文字列を引数としたuseStateの戻り値を分割代入
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  });
  const API_KEY = process.env.REACT_APP_TEST_API_KEY;
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`

  const getWeather = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setResults({
        country: data.location.country,
        cityName: data.location.name,
        temperature: data.current.temp_c,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon
      })
      setCity(""); //検索した後、次に検索するときのためにフォームを初期化
      toggleError(false)
    })
    .catch(err =>
      toggleError(true)
      )
      setCity("") //検索した後、次に検索するときのためにフォームを初期化
    }
    
    const toggleError = (bool: boolean) => {
      setError(bool)
      setLoading(false)
  }

  return (
    <div className="wrapper">
      <div className="body">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} city={city}/>
        {/* 三項演算子：loadingが真ならLoadingコンポーネントを表示、偽ならResultsを表示 */}
        {/* loadingが偽のときエラーが出ていればNoticeを表示、そうでなければResultsを表示*/}
        {loading ? 
            <Loading /> :  
            (isError ?
            <Notice /> :
            <Results results={results} />)
        }
      </div>
    </div>
  );
}

export default App;
