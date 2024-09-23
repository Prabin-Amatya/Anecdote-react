import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers:{
        setNotification(state, action){
            return action.payload
        },
        
        resetNotification(){
            return null
        }
    }
})

export const {setNotification, resetNotification} = notificationSlice.actions

export const notificationSetter = (message, time) =>{
    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(resetNotification())
        }, time)
    }
}
export default notificationSlice.reducer