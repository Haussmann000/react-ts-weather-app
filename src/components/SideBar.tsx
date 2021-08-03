// SideBar.tsx

// 型定義
type FormPropsType = {
    city: string;
    setMessage :React.Dispatch<React.SetStateAction<string>>;
    getWeather: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: Function;
    isDisabled: boolean;
  }
const SideBar = ({city, setMessage, getWeather, handleChange, isDisabled} :FormPropsType) => {

    return(
        <div>
            <button type="submit">a</button>
        </div>
      )};
    
    export default SideBar;