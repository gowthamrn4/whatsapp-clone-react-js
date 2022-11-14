import React, { useContext,useState,useEffect} from 'react'
import './Home.scss';
import { GlobalContextProvider } from '../../shared/contexts/Global-Context';
import socket from "../../shared/libs/base";
import MessageBox from '../../shared/controls/messagebox/messagebox'
export default function Home() {

    const [state, dispatch] = useContext(GlobalContextProvider);

    const [selectUser,setUser] = useState(0);

    useEffect(()=>{
        socket.on('roomData',function(data){
            dispatch({type:'NEWUSER',payload:data.users})
        })
    },[socket])
    
    useEffect(()=>{
        socket.on('message',function(data){
            dispatch({type:'ADDMESSAGE',payload:data})
        })
    },[])

    
    useEffect(()=>{
        socket.on('typing',function(data){
            console.log('typing',data)
            dispatch({type:'TYPING',payload:data})
        })
    },[])
    
    useEffect(()=>{
        socket.on('leftUser',function(data){
            dispatch({type:'REMOVEUSER',payload:data.users})
        })
    },[socket])

   const notification = (index) =>{
        const getNotificationUser = state.users[index];
        const getNewMessageCount = getNotificationUser.messages.filter(res=>res.read == false);
        return getNewMessageCount.length;
    }

    const unReadMessage = (index,user) =>{
        setUser(index);
        dispatch({type:'UNREAD',payload:user})
    }


    return (
        <div className="container">
            <div className="float-child">
               {
                    state.users.map((resp,index)=>{
                        return(
                        <div key={index} style={{ padding:5,background:'gray',color:'white',marginBottom:5, }} onClick={()=>unReadMessage(index,resp)}>
                            <span>{resp.name}</span>
                           {notification(index) > 0 && <span style={{marginLeft:5, background:'red',paddingLeft:5,paddingRight:5 }}>{ notification(index)}</span>}
                           <br/>
                           {resp.typing && 'typing.....'}
                        </div>
                        )
                    })
                }
            </div>
            
            <div className="float-child_two">
                 {state.users.length > 0 && <MessageBox user={state.users[selectUser]} messages={state.users[selectUser] ? state.users[selectUser].messages : []}/>}
            </div>
            
        </div>
    )
}
