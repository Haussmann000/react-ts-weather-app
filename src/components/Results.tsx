// Results.tsx

// 取得結果の型定義
// App.tsxからコピー
type ResultsStateType = {
  results: {
    country: string;
    cityName: string;
    temperature: string;
    conditionText: string;
    icon: string  ;
  }
}

const Results = (props: ResultsStateType) => {
  return(
    <div>
      {props.results.cityName && <div>{props.results.cityName}</div>}
      {props.results.country && <div>{props.results.country}</div>}
      {props.results.temperature && 
        <div>{props.results.temperature}</div>}
      {props.results.temperature && 
        <div>{props.results.temperature}
          <span>C°</span>
        </div>
        }
      {props.results.conditionText && 
        <div>
          <img src={props.results.icon} alt="weatherIcon" />
          <span>
            {props.results.conditionText}
          </span>
        </div>}
    </div>
  );
}

export default Results;