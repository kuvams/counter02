import './App.css'
import {Settings} from "./components/Settings";
import {Panel} from "./components/Panel";
import {useState} from "react";

export type MessageType = null | string


function App() {
    const [isSettings, setIsSettings] = useState(false)
    const [startValue, setStartValue] = useState(JSON.parse(localStorage.getItem('startValue') || '0'))
    const [maxValue, setMaxValue] = useState(JSON.parse(localStorage.getItem('maxValue') || '5'))

    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState<MessageType>(null)

    const [value, setValue] = useState(startValue)


    return (
        <div className="counterApp">
            {!isSettings ?
                <Panel
                    changePanel={() => setIsSettings(true)}
                    isError={isError}
                    message={message}
                    maxValue={maxValue}
                    startValue={startValue}
                    count={value}
                    setCount={setValue}/> :
                <Settings
                    changePanel={() => setIsSettings(false)}
                    isError={isError}
                    setIsError={setIsError}
                    startValue={startValue}
                    maxValue={maxValue}
                    setMaxValue={setMaxValue}
                    setStartValue={setStartValue}
                    setMessage={setMessage}
                    setValue={setValue}
                />}

        </div>
    );
}

export default App;


