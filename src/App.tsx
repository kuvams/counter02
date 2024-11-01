import './App.css'
import {Settings} from "./components/Settings";
import {Panel} from "./components/Panel";
import {useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./app/store";

export type MessageType = null | string


function App() {
    const [isSettings, setIsSettings] = useState(false)
    const maxValue = useSelector<AppRootStateType, number>((state) => state.counter.maxValue)
    const startValue = useSelector<AppRootStateType, number>((state) => state.counter.minValue)

    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState<MessageType>(null)

    return (
        <div className="counterApp">
            {!isSettings ?
                <Panel
                    changePanel={() => setIsSettings(true)}
                    isError={isError}
                    message={message}
                    maxValue={maxValue}
                    startValue={startValue}/> :
                <Settings
                    changePanel={() => setIsSettings(false)}
                    isError={isError}
                    setIsError={setIsError}
                    startValue={startValue}
                    maxValue={maxValue}
                    setMessage={setMessage}
                />}

        </div>
    );
}

export default App;


