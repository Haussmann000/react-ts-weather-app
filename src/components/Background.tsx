import  { useState, useEffect, useRef } from 'react'; //useStateをインポート
import { createClient } from 'pexels';
import App from '../App';
const API_BACK_KEY =  process.env.REACT_APP_BACK_API_KEY;
const client = createClient(`${API_BACK_KEY}`);
const query = 'weather';
let imageNumber = 10;

export default function Background() {
  const jsonRef = useRef<object>({});
  const [count, setCount] = useState<number>(1);
  const [url, setUrl] = useState<string>("");
  const refImageUrl = useRef<string>(url);
  const refImageCounter = useRef(count);

  const fetchImage = (imageNumber = 10) => {
    client.photos.search({query, per_page: imageNumber})
    .then((res :any) => {
      jsonRef.current = res;
      refImageUrl.current = res.photos[0].src.large2x;
    })
    .catch(e => {
      console.error(e);
    })
    .finally(function(){
    })
  }
  
  
  const changeImage = (result :any) => {
    const increment = () => setCount((prevCount) => prevCount + 1)
    if(refImageCounter.current < imageNumber) {
      increment();
    } else {
      refImageCounter.current = 0;
      setCount(0);
    }
    try {
      setUrl(result.photos[refImageCounter.current].src.large2x);
    }catch (e){
      console.error(e);
    }
    
    let bg = document.querySelector<HTMLElement>('#background');
    if(bg !== null) {
      bg.classList.add("fadeIn");
      // bg.style.background = `url(${refImageUrl.current}) no-repeat`;
      refStyle.current = {background: `url(${refImageUrl.current}) no-repeat`}
      bg.style.backgroundSize = 'cover';
      // bg.classList.remove("fadeIn");
    }

    
  }

  useEffect(() => {
    fetchImage(imageNumber);
  }, []);
  
  useEffect(() => {
    refImageCounter.current = count;
  },[count]);
  
  useEffect(() => {
    refImageUrl.current = url;
  }, [url]);
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      changeImage(jsonRef.current);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const refStyle = useRef({
      background: ""
  });

  return(
    <div id="background" style={refStyle.current} className="fadeIn">
      <App />
    </div>
  )
}
