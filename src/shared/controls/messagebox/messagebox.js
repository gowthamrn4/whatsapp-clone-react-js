import React, { useContext,useState,useEffect} from 'react'
import socket from "../../libs/base";
import { GlobalContextProvider } from '../../contexts/Global-Context';
import './messagebox.scss';


function MessageBox({ messages,user }) {

    const [state, dispatch] = useContext(GlobalContextProvider);

    const [text,setText] = useState();

    const send =()=>{
        const msg = { user:user,message:text,type:'you',read:false};
        socket.emit('sendMessage',msg,function(data){
            dispatch({type:'LocalMessage',payload:msg})
        })
    }

    useEffect(() => {
        typingFunction()
        const delayDebounceFn = setTimeout(() => {
            let innerData ={ user:user, typing:false}
            socket.emit("typing", innerData,function(data){});
        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [text])


    const typingFunction = () =>{
        let innerData ={ user:user, typing:true}
        socket.emit("typing", innerData,function(data){});
    }


    return(
        <div className="msger">
            <header className="msger-header">
                <div className="msger-header-title">
                    <i className="fas fa-comment-alt"></i> 
                    {user && user.name}
                </div>
                <div className="msger-header-options">
                    <span><i className="fas fa-cog"></i></span>
                </div>
            </header>

            <main className="msger-chat">

            {messages && messages.length > 0 &&messages.map((res)=>{
                if(res.type == "me"){
                    return(
                    <div className="msg right-msg" style={{ background:'gray' }}>
                        <div className="msg-img"></div>
                        <div className="msg-bubble">
                            <div className="msg-info">
                                <div className="msg-info-name">{state.currentUser}</div>
                                <div className="msg-info-time">12:46</div>
                            </div>
    
                            <div className="msg-text">
                            {res.text}
                            </div>
                        </div>
                    </div>
                    )
                }else{
                    return(
                    <div className="msg left-msg" style={{ background:'lightgray' }}>
                        <div  className="msg-img"></div>
                        <div className="msg-bubble">
                            <div className="msg-info">
                                <div className="msg-info-name">{res.user}</div>
                                <div className="msg-info-time">12:45</div>
                            </div>
    
                            <div className="msg-text">
                            {res.text}
                            </div>
                        </div>
                    </div>
                    )
                }
            })}

            </main>

            <div className="msger-inputarea" style={{ position:'relative' }}>

            { user.typing &&  <div style={{ background:'lightgray',padding:5,position:'absolute',bottom:50,left:10,right:10 }}>
            {`${user && user.name} typing.....`}
            </div> }

                <input type="text" className="msger-input" placeholder="Enter your message..." onChange={(e)=>setText(e.target.value)}/>
                <button type="submit" className="msger-send-btn" onClick={()=>send()}>Send</button>
            </div>
        </div>
    )
}

export default MessageBox
