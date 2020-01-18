import quotes from './assets/quotes'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

export enum Types {
    CHANGE_QUOTE,
    AUTOMATIC = 'AUTOMATIC',
    TIME_TO_CHANGE_THOUGHTS = 'TIME_TO_CHANGE_THOUGHTS',
    TIME_SAVE_STORAGE = 'TIME_SAVE_STORAGE',
    CURRENT_SEGMENT = 'CURRENT_SEGMENT',
    LOAD_ALL = 'LOAD_ALL',
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
    timeSaveOnStorage: number,
    currentSegment: number,
}

interface Payload {
    value: Quote | boolean | number | Config
}

interface Action {
    type: Types,
    payload?: Payload
}


export const INITIAL_STATE: Config = {
    quote: randomQuote(),
    automatic: false,
    timeToChangeThoughts: 8,
    timeSaveOnStorage: 8,
    currentSegment: 0
}

export const reducer = (state: Config | any = INITIAL_STATE, action: Action) => {
    switch(action.type) {
        case Types.CHANGE_QUOTE:
            return {...state, quote: {...randomQuote()}}
        case Types.AUTOMATIC:
            return {...state, automatic: action.payload?.value}
        case Types.TIME_TO_CHANGE_THOUGHTS:
            return {...state, timeToChangeThoughts: action.payload?.value}
        case Types.TIME_SAVE_STORAGE:
            return {...state, timeSaveOnStorage: action.payload?.value}
        case Types.CURRENT_SEGMENT:
            return {...state, currentSegment: action.payload?.value}
        case Types.LOAD_ALL:
            const config = action.payload?.value as Config
            return {
                ...state,
                automatic: config.automatic,
                timeToChangeThoughts: config.timeToChangeThoughts,
                currentSegment: config.currentSegment,
                timeSaveOnStorage: config.timeSaveOnStorage
            }
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
            AsyncStorage.setItem(Types.AUTOMATIC, value.toString())
            dispatch({type: Types.AUTOMATIC, payload: {value}})
        },
        setTime(value: number, updateStorage?: boolean) {
            if (updateStorage) {
                AsyncStorage.setItem(Types.TIME_TO_CHANGE_THOUGHTS, value.toString())
                dispatch({type: Types.TIME_SAVE_STORAGE, payload: {value}})
            }
            dispatch({type: Types.TIME_TO_CHANGE_THOUGHTS, payload: {value}})
        },
        setSegment(value: number) {
            AsyncStorage.setItem(Types.CURRENT_SEGMENT, value.toString())
            dispatch({type: Types.CURRENT_SEGMENT, payload: {value}})
        },
        async load() {
            const time = Number(await AsyncStorage.getItem(Types.TIME_TO_CHANGE_THOUGHTS) ?? INITIAL_STATE.timeSaveOnStorage)
            const automatic = await AsyncStorage.getItem(Types.AUTOMATIC)
            const value: Config = {
                automatic: automatic === 'true' ? true : automatic === 'false' ? false : INITIAL_STATE.automatic,
                currentSegment: Number(await AsyncStorage.getItem(Types.CURRENT_SEGMENT) ?? INITIAL_STATE.currentSegment),
                timeToChangeThoughts: time,
                timeSaveOnStorage: time,
                quote: INITIAL_STATE.quote
            }
            dispatch({type: Types.LOAD_ALL, payload: {value}})
        }
    }
}

function randomQuote(): Quote {
    return quotes[Math.floor(Math.random() * quotes.length)]
}

