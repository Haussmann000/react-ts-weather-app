import React, { useState } from 'react'; //useStateをインポート
import Title from './components/Title';
import Form from './components/Form';
import Results from './components/Results';
import './App.css';

// 取得結果の型定義
type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string  ;
}

function App() {
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
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setResults({
        country: data.location.country,
        cityName: data.location.name,
        temperature: data.current.temp_c,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon
      });
    });
  }

  return (
    <div className="wrapper">
      <div className="body">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} />
        <Results results={results}/>
      </div>
    </div>
  );
}

export default App;
