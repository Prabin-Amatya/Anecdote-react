import { useSelector } from "react-redux"

const Notification = () =>{
    const message_style = {
        border: 'solid',
        padding: 10
    }

    const notification = useSelector(state => state.notification)
    
    return(
    <div style={notification? message_style: {}}>
        {notification}
    </div>
    )
}

export default Notification