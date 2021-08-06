// SideBar.tsx

// 型定義
type FormPropsType = {
    cities: object;
    setMessage :React.Dispatch<React.SetStateAction<string>>;
    getWeather: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: Function;
    isDisabled: boolean;
  }
const SideBar = ({cities, setMessage, getWeather, handleChange, isDisabled} :FormPropsType) => {

    const cityName = Object.values(cities).map(city => {
      return city;
    })

    cityName.forEach((element, index) => {
      console.log(cityName[index]);
    });

    console.log(cityName)
    return(
        <div className="flex">
            <button type="submit" disabled={isDisabled} onClick={e => handleChange({cities})}>{cities}</button>
        </div>
      )};
    
    export default SideBar;