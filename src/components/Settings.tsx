import React, {ChangeEvent, useEffect} from "react";
import {MessageType} from "../App";
import {useDispatch} from "react-redux";
import {setCounterSettingsAC} from "../model/CounterReducer";

export type SettingsPropsType = {
    maxValue: number

    startValue: number

    setMessage: (value: MessageType) => void

    isError: boolean
    setIsError: (value: boolean) => void

    changePanel: () => void
}

export const Settings = (props: SettingsPropsType) => {
    const {maxValue, startValue, isError} = props

    const dispatch = useDispatch()

    const [maxValueInput, setMaxValueInput] = React.useState<number>(maxValue)
    const [startValueInput, setStartValueInput] = React.useState<number>(startValue)

    const setHandler = () => {
        props.setMessage(null)
        dispatch(setCounterSettingsAC({minValue: startValueInput, maxValue: maxValueInput}))
        props.changePanel()
        localStorage.setItem('maxValue', JSON.stringify(maxValueInput))
        localStorage.setItem('startValue', JSON.stringify(startValueInput))
    }
    const backHandler = () => {
        props.setMessage(null)
        props.changePanel()
    }
    const startValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStartValueInput(Number(e.currentTarget.value))
    }
    const maxValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValueInput(Number(e.currentTarget.value))
    }
    useEffect(() => {
        props.setIsError(false)
        if (startValueInput < 0 || maxValueInput <= startValueInput) {
            props.setMessage('Incorrect value')
            props.setIsError(true)
        } else {
            props.setMessage('enter values and press "set"')
        }
    }, [startValueInput, maxValueInput])


    return (
        <div className="mainBlock">
            <div className="display">
                <div className='param'>
                    <span>
                        max value:
                    </span>
                    <input
                        className={isError ? 'errorParamInput' : 'paramInput'}
                        type='number'
                        value={maxValueInput}
                        onChange={maxValueChangeHandler}/>
                </div>
                <div className='param'>
                    <span>
                        start value:
                    </span>
                    <input
                        className={isError ? 'errorParamInput' : 'paramInput'}
                        type='number'
                        value={startValueInput}
                        onChange={startValueChangeHandler}/>
                </div>
            </div>
            <div className="buttons">
                <button onClick={backHandler}>
                    back
                </button>
                <button onClick={setHandler} disabled={isError}>
                    set
                </button>
            </div>
        </div>
    )
}