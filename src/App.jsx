import React, { useState } from "react";

function ChatInput({chatMessages , setChatMessages }){
  
    const [InputValue , setInputValue]  = useState('');

    function inputChange(event){
        setInputValue(event.target.value);
    }
    function keyboard(event){
        if(event.key=="Enter"){
          sendMessage();
        }
    }

    function sendMessage(){

          const newChatmessages = [
              ...chatMessages,
              {
                message:InputValue,
                sender:"user",
                id:crypto.randomUUID()
              }
            ];

          setChatMessages(newChatmessages);
  
          const response = Chatbot.getResponse(InputValue);
          setChatMessages([
              ...newChatmessages,
              {
                message:response,
                sender:"bot",
                id:crypto.randomUUID()
              }
            ]);
            
          setInputValue("");

    }

    return (
      <div className="chat-input-container">
        <input 
            placeholder="Enter your prompt here" 
            type='text' 
            size={30} 
            onChange={inputChange}
            value={InputValue}
            onKeyDown={keyboard}
            className="chat-input"
            
        />
        <button onClick={sendMessage} 
                className="send-button"> Send </button>
      </div>
    )
}

function Message(props){ // or we can use Message({message,sender}) as an even simple shortcut , since the first parameter is props , destructuring takes there itself.

  const {message , sender} = props;

  return (
    <div className={
            sender === 'user'
              ? 'chat-message-user'
              : 'chat-message-robot'
          }>
      {sender==='bot' && <img className="chat-message-profile"  src="../bot.png" />}
      <div className="chat-message-text" >{message}</div>
      {sender==='user' && <img className="chat-message-profile" src="../user.png" />}
    </div>
  );
}

function ChatMessages({chatMessages}){

  const chatMessagesRef = React.useRef(null);

  React.useEffect(()=>{
      const chatMessageElem = chatMessagesRef.current
      if(chatMessageElem){
        chatMessageElem.scrollTop = chatMessageElem.scrollHeight;
      }
  },[chatMessages])

  return (
      <div className="chat-messages-container" ref={chatMessagesRef}>
        {chatMessages.map((currentMessage)=>{
                             return (
                                      <Message 
                                        message={currentMessage.message} 
                                        sender={currentMessage.sender} 
                                        key={currentMessage.id}
                                      />)
                          }
                        )}
      </div>
  );
  
}


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
