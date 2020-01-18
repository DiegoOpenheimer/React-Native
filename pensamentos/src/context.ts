import quotes from './assets/quotes'
import { useDispatch } from 'react-redux'

export enum Types {
    CHANGE_QUOTE, AUTOMATIC, TIME_TO_CHANGE_THOUGHTS, CURRENT_SEGMENT
}

export interface Quote {
    quote: string,
    author: string,
    image: any
}

export interface Config {
    quote: Quote,
    automatic: boolean,
    timeToChangeThoughts: number,
    currentSegment: number,
}

interface Payload {
    value: Quote | boolean | number
}

interface Action {
    type: Types,
    payload?: Payload
}


export const INITIAL_STATE: Config = {
    quote: randomQuote(),
    automatic: false,
    timeToChangeThoughts: 8,
    currentSegment: 0
}

export const reducer = (state: Config | any = INITIAL_STATE, action: Action) => {
    switch(action.type) {
        case Types.CHANGE_QUOTE:
            return {...state, quote: randomQuote()}
        case Types.AUTOMATIC:
            return {...state, automatic: action.payload?.value}
        case Types.TIME_TO_CHANGE_THOUGHTS:
            return {...state, timeToChangeThoughts: action.payload?.value}
        case Types.CURRENT_SEGMENT:
            return {...state, currentSegment: action.payload?.value}
        default:
            return state
    }   

}

export const useDispatchConfig = () => {
    const dispatch = useDispatch()
    return {
        changeQuote() {
            dispatch({type: Types.CHANGE_QUOTE})
        },
        setAutomatic(value: boolean) {
            dispatch({type: Types.AUTOMATIC, payload: {value}})
        },
        setTime(value: number) {
            dispatch({type: Types.TIME_TO_CHANGE_THOUGHTS, payload: {value}})
        },
        setSegment(value: number) {
            dispatch({type: Types.CURRENT_SEGMENT, payload: {value}})
        }
    }
}

function randomQuote(): Quote {
    return quotes[Math.floor(Math.random() * quotes.length)]
}

