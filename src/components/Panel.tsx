import React, {} from "react";
import {MessageType} from "../App";

export type PanelPropsType = {
    maxValue: number
    startValue: number

    isError: boolean
    message: MessageType

    count: number
    setCount: (count: number) => void
}

export const Panel = (props: PanelPropsType) => {
    const {maxValue, startValue, count, message, isError} = props
    const limit = count >= maxValue

    const incHandler = () => {
        props.setCount(count + 1)
    }
    const resetHandler = () => {
        props.setCount(startValue)
    }

    const isAllDisabled = !!message || isError

    return (
        <div className="mainBlock">
            <div className="display">
                {message ?
                    <span className={isError ? 'errorMessage' : 'message'}>{message}</span> :
                    <span className={limit ? 'countLimit' : 'count'}>{count}</span>
                }
            </div>
            <div className="buttons">
                <button
                    onClick={incHandler}
                    disabled={limit || isAllDisabled}>
                    inc
                </button>
                <button
                    onClick={resetHandler}
                    disabled={count === startValue || isAllDisabled}>
                    reset
                </button>
            </div>
        </div>
    )
}