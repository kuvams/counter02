import React, {ChangeEvent, useEffect} from "react";
import {MessageType} from "../App";

export type SettingsPropsType = {
    maxValue: number
    setMaxValue: (value: number) => void

    startValue: number
    setStartValue: (value: number) => void

    setMessage: (value: MessageType) => void

    isError: boolean
    setIsError: (value: boolean) => void

    setValue: (value: number) => void

    changePanel: () => void
}

export const Settings = (props: SettingsPropsType) => {
    const {maxValue, startValue, isError} = props

    const setHandler = () => {
        props.setMessage(null)
        props.setValue(startValue)
        props.changePanel()
    }
    const startValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setStartValue(Number(e.currentTarget.value))
    }
    const maxValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setMaxValue(Number(e.currentTarget.value))
    }
    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))
        props.setIsError(false)
        if (startValue < 0 || maxValue <= startValue) {
            props.setMessage('Incorrect value')
            props.setIsError(true)
        } else {
            props.setMessage('enter values and press "set"')
        }
    }, [startValue, maxValue])


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
                        value={maxValue}
                        onChange={maxValueChangeHandler}/>
                </div>
                <div className='param'>
                    <span>
                        start value:
                    </span>
                    <input
                        className={isError ? 'errorParamInput' : 'paramInput'}
                        type='number'
                        value={startValue}
                        onChange={startValueChangeHandler}/>
                </div>
            </div>
            <div className="buttons">
                <button onClick={setHandler} disabled={isError}>
                    set
                </button>
            </div>
        </div>
    )
}