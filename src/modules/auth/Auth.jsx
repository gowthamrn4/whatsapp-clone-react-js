import React, { useState,useContext,useEffect} from 'react'
import './Auth.scss';
import io from "socket.io-client";
import Textbox from '../../shared/controls/textbox/Textbox';
import { formValueProcess } from '../../shared/libs/common';
// import socket from "../../shared/libs/base";
import { GlobalContextProvider } from '../../shared/contexts/Global-Context';

let url = 'http://localhost:8004/chat-service'
let userName = 'Gowthamrn4@@@' // for example and debug
let token = 'token' // auth token
let query = `userName=${userName}&token=${token}`
let opts = { query }
// let socket = io.connect(url, opts)

function Auth(props) {
    const [error,setError] = useState(null);
    const [socketConnnect,setSocket] = useState();
    const [fieldArray] = useState([
        {
            fieldKey: 'email',
            fieldType: 'textbox',
            fieldColumn: 'email',
            fieldCaption: 'Username',
            additionMetaData: {},
            type: 'text',
            pattern: '',
            patternMsg: '',
            value: null,
            isRequired: true
        },
    ]);

    const [state, dispatch] = useContext(GlobalContextProvider);

    const dispatchUser = (list)=>{
        dispatch({type:'GETUSERLIST',payload:list})
    }

//     useEffect(()=>{
//             // Rooms messages handler (own messages are here too).
//             socket.on('roomMessage', (room, msg) => {
//                 console.log(`${msg.author}: ${msg.textMessage}`)
//             })
            
//             // Auth success handler.
//             socket.on('loginConfirmed', userName => {
//                 console.log('*********** userName',userName)
//                 socket.emit('roomJoin', 'default', (error, data) => {
//                 // Check for a command error.
//                 if (error) { return }
//                 // Now we will receive 'default' room messages in 'roomMessage' handler.
//                 // Now we can also send a message to 'default' room:
//                 socket.emit('roomMessage', 'default', { textMessage: 'Hello!' })
//                 })
//             })
            
//             // Auth error handler.
//             socket.on('loginRejected', error => {
//                 console.error(error)
//   })
//     })


    

    const submit = (e) => {
        e.preventDefault();
        let formData = formValueProcess(fieldArray, e.target);
        if (formData.isValid) {
            let socket = io.connect(url, opts)
            setSocket(socket)
            socket.emit('roomJoin', 'Main', (error, data) => {
                console.log('error',error)
                console.log('data',data)
            })
            console.log('socket',socket)
            // socket.emit('join',{name:formData.values.email},function(resp){
            //    if(resp.error){ setError(resp.error)} 
            //    else{
            //     dispatch({type:'SETCURRENTUSER',payload:formData.values.email})
            //     dispatchUser(resp.users)
            //     props.history.push('/home');
            //     setError(null)
            //    }
            // })
        } else {
            setError('Invalid Username')
        }
    }

    return (
        <div className="container">
            <form className="form fx-row" action="" onSubmit={submit} autoComplete="off">
                <div className="fx-column fx-start-stretch">
                    <div className="fx-column fx-start-stretch">
                        {
                            fieldArray.map((item, i) =>
                                <div key={`${item.fieldKey}`} className="fx-row fx-start-center">
                                    <Textbox field={item} />
                                </div>
                            )
                        }
                        {error}
                    </div>
                    <div className="fx-column fx-center-center ">
                        <button className="loginBtn" type="submit">Signin</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Auth

