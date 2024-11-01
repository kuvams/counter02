const initialState = {
    minValue: Number(JSON.parse(localStorage.getItem('startValue') || '0')),
    maxValue: Number(JSON.parse(localStorage.getItem('maxValue') || '5')),
    value: Number(JSON.parse(localStorage.getItem('startValue') || '0'))
}
export type stateType = typeof initialState

export const counterReducer = (state: stateType = initialState, action: ActionsType): stateType => {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, value: state.value + 1}
        case 'RESET':
            return {...state, value: state.minValue}
        case 'SET':
            localStorage.setItem('startValue', JSON.stringify(action.payload.minValue))
            localStorage.setItem('maxValue', JSON.stringify(action.payload.maxValue))
            return {...action.payload, value: action.payload.minValue}
        default:
            return state
    }
}

export const incrementAC = () => {
    return {
        type: 'INCREMENT',
    } as const
}
export const resetCounterAC = () => {
    return {
        type: 'RESET',
    } as const
}
export const setCounterSettingsAC = (payload: {minValue: number, maxValue: number}) => {
    return {
        type: 'SET',
        payload
    } as const
}

export type IncrementActionType = ReturnType<typeof incrementAC>
export type ResetCounterActionType = ReturnType<typeof resetCounterAC>
export type SetCounterSettingsActionType = ReturnType<typeof setCounterSettingsAC>
export type ActionsType = IncrementActionType | ResetCounterActionType | SetCounterSettingsActionType

