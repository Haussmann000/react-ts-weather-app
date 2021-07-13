import React, { useState } from 'react'; //useStateをインポート
import Title from './components/Title';
import Form from './components/Form';
import Form2 from './components/Form2';
import Results from './components/Results';
import Loading from './components/Loading';
import Notice from './components/Notice';
import { createClient } from 'pexels';
import './App.css';
import type {ErrorResponse} from "pexels/dist/types"
import type {PhotosWithTotalResults} from "pexels/dist/types"

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
  const [message, setMessage] = useState<string>("");
  const [url, setUrl] = useState<PhotosWithTotalResults | ErrorResponse>({
    url: "",
    page: 0,
    per_page: 0,
    next_page: 0,
    photos: [
    {
      id: 0,
      width: 0,
      height: 0,
      url: "",
      photographer: "",
      photographer_url: "",
      photographer_id: "",
      liked: false,
      src: {
        original: "",
        large2x: "",
        large: "",
        medium: "",
        small: "",
        portrait: "",
        landscape: "",
        tiny: ""
      }
    }
  ],
  error: ""
  });
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
  const API_BACK_KEY =  process.env.REACT_APP_BACK_API_KEY;
  const client = createClient(`${API_BACK_KEY}`);
  const query = 'weather';
  

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


  function changeImage() {
    client.photos.search({query, per_page: 1})
    .then((res: PhotosWithTotalResults | ErrorResponse) => 
      // console.log(res)
    // setUrl(Object.values(res)[2][0].src.large)
    setUrl(res)
    ).catch(e => {
      toggleError(true);
    })
    const image = document.querySelector<HTMLElement>('#wrapper');
    if(image) image.style.background = `url("${url}") center center no-repeat`;
  };
  changeImage();

  return (
    <div className="wrapper" id="wrapper">
      <div className="body">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} city={city}/>
        <Form2 city={city} setMessage={setMessage} getWeather={getWeather}/>
        {/* 三項演算子：loadingが真ならLoadingコンポーネントを表示、偽ならResultsを表示 */}
        {/* loadingが偽のときエラーが出ていればNoticeを表示、そうでなければResultsを表示*/}
        {loading ? 
            <Loading /> :  
            (isError ?
              <Notice /> :
              <Results results={results} />
            )
        }
      </div>
    </div>
  );
}

export default App;
