import React from 'react';


// 型定義
type FormPropsType = {
  city: string;
  setMessage :React.Dispatch<React.SetStateAction<string>>;
  getWeather: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: Function;
  isDisabled: boolean;
}

const buttonTouch = () => {
  const btn = document.querySelector<HTMLElement>('button');
  btn?.classList.add("touched");
  console.log("touched");
  setTimeout(e => {
    btn?.classList.add("end")
  }
  , 300);
}
const buttonLeave = () => {
  const btn = document.querySelector<HTMLElement>('button');
  btn?.classList.remove("touched");
  btn?.classList.remove("end");
}

const Form = ({city, setMessage, getWeather, handleChange, isDisabled} :FormPropsType) => {
    return (
        <div>
        <p>{setMessage}</p>
        <form onSubmit={getWeather} className="weatherForm">
          <input type="text" name="city" value={city} onChange={e => handleChange(e.target.value)} placeholder="都市名(英語)"/>
          <button type="submit" disabled={isDisabled} onMouseOver={buttonTouch} onMouseLeave={buttonLeave}>Get Weather</button>
        </form>
        </div>
    );
}

export default Form;