import React, { useState, useEffect, useRef } from 'react'; //useStateをインポート
import Title from './components/Title';
import Form from './components/Form';
import Form2 from './components/Form2';
import Results from './components/Results';
import Loading from './components/Loading';
import Notice from './components/Notice';
import { createClient } from 'pexels';
import './App.css';
// import Background from './components/Background';


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
  const [url, setUrl] = useState<string>("");
  const [count, setCount] = useState<number>(0);
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
  let apiResult :any;
  let imageNumber = 10;

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
  
  
  
  const fetchImage = (imageNumber = 10) => {
    client.photos.search({query, per_page: imageNumber})
    .then((res :any) => {
      apiResult = res;
    })
    .catch(e => {
      console.error(e);
    })
    .finally(function(){
      console.log(apiResult);
    })
  }
  
  
  
  const changeImage = (result :any) => {
    let bg = document.querySelector<HTMLElement>('#wrapper');
    const increment = () => setCount((prevCount) => prevCount + 1)
    if(refImage.current < imageNumber - 1) {
      increment();
      console.log(`${refImage.current} < ${imageNumber}`);
    } else {
      refImage.current = 0;
      setCount(0);
    }
    try {
      setUrl(result.photos[refImage.current].src.large2x);
      console.log(`fetchUrl: ${result.photos[refImage.current].src.large2x}`);
    }catch (e){
      console.error(e);
    }
    
    console.log(`setUrl: ${url}`)
    if(bg !== null) {
      console.log(`changeurl: ${url}`)
      bg.style.background = `url(${url}) no-repeat`;
      console.log("image changed")
    }
    
  }
  
  const refImage = useRef(count);
  useEffect(() => {
    refImage.current = count;
    console.log(refImage.current)
  },[count]);
  
  useEffect(() => {
    fetchImage(imageNumber);
    const interval = setInterval(() => {
      changeImage(apiResult);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
    <div className="wrapper" id="wrapper">
      {/* <div className="body"> */}
        {/* <Background /> */}
        <Title />
        <Form setCity={setCity} getWeather={getWeather} city={city}/>
        <Form2 city={city} setMessage={setMessage} getWeather={getWeather}/>
        {/* 三項演算子：loadingが真ならLoadingコンポーネントを表示、偽ならResultsを表示 */}
        {/* loadingが偽のときエラーが出ていればNoticeを表示、そうでなければResultsを表示*/}
        {loading ? 
            <Loading /> :  
            (isError ?
              <Notice message={message} setMessage={setMessage}/> :
              <Results results={results} />
              )
            }
      {/* </div> */}
    </div>
    </>
  );
}

export default App;
