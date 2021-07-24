// Results.tsx

import { ResultsStateType } from "../App";
type ResultsPropsType = {
  results: ResultsStateType;
}

const Results = ({ results }: ResultsPropsType) => {
  const {cityName, country, temperature, conditionText, icon} = results;
  return(
    <>
      {cityName &&
        <div className="resultArea">
          {cityName && <div className="cityName">{cityName}</div>}
          {country && <div className="countryName">{country}</div>}
          {temperature && 
            <div className="temperature">{temperature}</div>}
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
          </div>
        }
    </>
  );
}

export default Results;