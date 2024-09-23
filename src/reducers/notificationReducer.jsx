import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) =>{
    console.log(action)
    switch (action.type) {
        case 'MESSAGE':
            return action.payload
        case 'RESET':
            return {}

        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) =>{
    const [notification, notificationDispatcher] = useReducer(notificationReducer, {})

    return(
        <NotificationContext.Provider value={[notification, notificationDispatcher]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () =>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatcher = () =>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const successNotification = (message) =>{
    console.log(message)
    return({
        type: 'MESSAGE',
        payload: {
            type: 'SUCCESS',
            message
        }
    })
}

export const errorNotification = (message) =>{
    return({
        type: 'MESSAGE',
        payload: {
            type: 'ERROR',
            message
        }
    })
}

export const resetNotification = () =>{
    return({
        type: 'RESET'
    })
}

export default NotificationContext