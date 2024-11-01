import React, {} from "react";
import {MessageType} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {incrementAC, resetCounterAC} from "../model/CounterReducer";
import {AppRootStateType} from "../app/store";

export type PanelPropsType = {
    maxValue: number
    startValue: number

    isError: boolean
    message: MessageType

    changePanel: () => void
}

export const Panel = (props: PanelPropsType) => {
    const {maxValue, startValue, message, isError} = props
    const count = useSelector<AppRootStateType, number>((state) => state.counter.value)
    const limit = count >= maxValue

    const dispatch = useDispatch()

    const incHandler = () => {
        dispatch(incrementAC())
    }
    const resetHandler = () => {
        dispatch(resetCounterAC())
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
                <button
                    onClick={props.changePanel}>
                    set
                </button>
            </div>
        </div>
    )
}