import React, { useState, useEffect, useRef } from 'react'; //useStateをインポート
import Title from './components/Title';
import Form from './components/Form';
import Results from './components/Results';
import Loading from './components/Loading';
import Notice from './components/Notice';
import Background from './components/Background';
import Header from './components/Header';
import 'tailwindcss/tailwind.css'
import './App.css';

// import { createClient } from 'pexels';

// const API_BACK_KEY =  process.env.REACT_APP_BACK_API_KEY;
// const client = createClient(`${API_BACK_KEY}`);
// const query = 'weather';
// let imageNumber = 10;
// const intervalTime = 8000;
// let style : {background: string};


// 取得結果の型定義
export type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string  ;
}

const initialResult = {
  country: "",
  cityName: "",
  temperature: "",
  conditionText: "",
  icon: ""  
}

function App() {
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 
  const [isError, setError] = useState<boolean>(false);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>(initialResult);
  const API_KEY = process.env.REACT_APP_TEST_API_KEY;
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  
  const jsonRef = useRef<object>({});
  const [count, setCount] = useState<number>(1);
  const [url, setUrl] = useState<string>("");
  const refImageUrl = useRef<string>(url);
  const refImageCounter = useRef<number>(count);


  const toggleError = (bool: boolean) => {
    setError(bool)
    setLoading(false)
}
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
      toggleError(false)
    })
    .catch(e => {
      toggleError(true)
      setMessage("都市名が見つかりません")
      console.error(e)
    })
      setCity("") //検索した後、次に検索するときのためにフォームを初期化
      setDisabled(true);
    }

  // const fetchImage = (imageNumber = 10) => {
  //   client.photos.search({query, per_page: imageNumber})
  //   .then((res :any) => {
  //     jsonRef.current = res;
  //     refImageUrl.current = res.photos[0].src.large2x;
  //   })
  //   .catch(e => {
  //     console.error(e);
  //   })
  // }

  // const increment = () => setCount((prevCount) => prevCount + 1)
  // const changeImage = (result :any) => {
  //   if(refImageCounter.current < imageNumber) {
  //     increment();
  //   } else {
  //     refImageCounter.current = 0;
  //     setCount(0);
  //   }
  //   try {
  //     setUrl(result.photos[refImageCounter.current].src.large2x);
  //   }catch (e){
  //     console.error(e);
  //   }
    
  //   let bg = document.querySelector<HTMLElement>('#background');
  //   if(bg !== null) {
  //     bg.classList.add("fadeIn");
  //     refStyle.current = {background: `url(${refImageUrl.current}) no-repeat`}
  //     style = refStyle.current;
  //     bg.style.backgroundSize = 'cover';
  //   }
  // }

  // useEffect(() => {
  //   fetchImage(imageNumber);
  // }, []);
  
  // useEffect(() => {
  //   refImageCounter.current = count;
  // },[count]);
  
  // useEffect(() => {
  //   refImageUrl.current = url;
  // }, [url]);
  
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     changeImage(jsonRef.current);
  //   }, intervalTime);
  //   return () => clearInterval(interval);
  // }, []);

  // const refStyle = useRef({
  //     background: ""
  // });


  function handleChange(value: string) {
    setMessage(contentValidation(value))
    setCity(value);
  }

  function contentValidation(value :string){
    const regex = new RegExp(/[^\x00-\x7E]+/g);
    if (!value){
      setDisabled(true);
      return '';
    } else {
      if(regex.test(value)) {
          console.log(regex.test(value))
          setDisabled(true);
          toggleError(true);
          return '半角英数字で入力してください';
        }
        setDisabled(false);
        return '';
      }
  }
  
  return (
    <>
    {/* <Header /> */}
    <Background />
    <div className="wrapper" id="wrapper">
      <Title />
        {loading ? 
            <Loading /> :  
            (isError ?
              <Notice message={message} setMessage={setMessage}/> :
              <Results results={results} />
              )
            }
      <div className="container">
        <Form city={city} setMessage={setMessage} getWeather={getWeather} handleChange={handleChange} isDisabled={isDisabled}/>
      </div>
    </div>
    </>
  );
}

export default App;
