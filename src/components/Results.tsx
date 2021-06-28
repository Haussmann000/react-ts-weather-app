// Results.tsx

// 取得結果の型定義をApp.tsxからimportしてResultPropsTypeに代入
import { ResultsStateType } from "../App";
type ResultsPropsType = {
  results: ResultsStateType;
}

const Results = ({ results }: ResultsPropsType) => {
  const {cityName, country, temperature, conditionText, icon} = results;
  return(
    // Reactでは純粋なdivは<>で代用できる
    // <div>
    <>
      {cityName && <div>{cityName}</div>}
      {country && <div>{country}</div>}
      {temperature && 
        <div>{temperature}</div>}
      {temperature && 
        <div>{temperature}
          <span>C°</span>
        </div>
        }
      {conditionText && 
        <div>
          <img src={icon} alt="weatherIcon" />
          <span>
            {conditionText}
          </span>
        </div>}
    </>
  );
}

export default Results;