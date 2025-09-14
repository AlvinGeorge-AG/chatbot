import  { useState } from "react";
import './App.css'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'




function App() {
  const [chatMessages , setChatMessages] = useState([  //Array Destructuring
    {
      message:"Hi hello",
      sender:"user",
      id:"id1"
    },
    {
      message:"Hi how can I help you !",
      sender:"bot",
      id:"id2"
    },
    {
      message:"No Thanks !",
      sender:"user",
      id:"id3"
    },
    {
      message:"Nice Feel free to Come back Again Bye !" ,
      sender:"bot",
      id:"id4"
    }
  ]);

  return (
    <div className="app-container">
      
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
