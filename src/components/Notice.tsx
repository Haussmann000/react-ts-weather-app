// Notice.tsx

type NoticePropType = {
  message: string;
  setMessage :React.Dispatch<React.SetStateAction<string>>;
}

const Notice = ({message, setMessage}: NoticePropType) => {
  const API_ERROR_MESSAGE = message
  return(
    <div className="notice">{API_ERROR_MESSAGE}</div>
  )
}

export default Notice;