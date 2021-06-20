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

  const getWeather = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`https://api.weatherapi.com/v1/current.json?key=71e1fae33db5403d89a54931212006&q=${city}&aqi=no`)
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
