import React,{useReducer} from "react";

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentUser:null,
};


const reducer = (state, action) => {
  switch (action.type) {
    case "GETUSERLIST":
      return {
        ...state,
        users: action.payload
      };
    case "SETCURRENTUSER":
      return {
        ...state,
        currentUser:action.payload
      }
    case "NEWUSER":
      return {
        ...state,
        users:[...state.users,action.payload]
      }
    case "REMOVEUSER":
      return{
        ...state,
        users:state.users.filter(res=>res.id !== action.payload.id)
      }
    case "ADDMESSAGE":
      return {
        ...state,
        users: state.users.map(res =>
          res.name === action.payload.user
          ? {
              ...res,
              messages:[...res.messages,action.payload]         
          }
          : res
      )
      }
    case "LocalMessage":
      return{
        ...state,
        users: state.users.map(res =>
          res.name === action.payload.user.name
          ? {
              ...res,
              messages:[...res.messages,{text:action.payload.message,user:action.payload.user.name,type:'me'}]         
          }
          : res
        )
      }
    case "UNREAD":
      return {
        ...state,
        users:state.users.map(res=>res.id == action.payload.id ? {
          ...res,
          messages:res.messages.map((resp)=>resp.read == false ? {...resp,read:true}:resp)
        } : res)
      }
    case "TYPING":
      return {
        ...state,
        users:state.users.map((res)=>res.id == action.payload.sender ? { ...res,typing:action.payload.typing } : res)
      }
    default:
      return state
  }
};

export const GlobalContextProvider = React.createContext();


const GlobalContext = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContextProvider.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalContextProvider.Provider>
  );
};

export default GlobalContext