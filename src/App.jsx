import React, { useState } from "react";

function ChatInput({chatMessages , setChatMessages }){
   const [InputValue , setInputValue]  = useState('');
  function inputChange(event){
      setInputValue(event.target.value);
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
  function keyboard(event){
      if(event.key=="Enter"){
        sendMessage();
      }
  }
  return (
    <>
      <input 
        placeholder="Enter your prompt here" 
        type='text' 
        size={30} 
        onChange={inputChange}
        value={InputValue}
        onKeyDown={keyboard}
      />
      <button
        onClick={sendMessage}
      >Send</button>
    </>
  )
}

function Message(props){ // or we can use Message({message,sender}) as an even simple shortcut , since the first parameter is props , destructuring takes there itself.

  const {message , sender} = props;

  return (
    <div>
      {sender==='bot' && <img width="30" src="../bot.png" />}
      {message}
      {sender==='user' && <img width="30" src="../user.png" />}
    </div>
  )
}

function ChatMessages({chatMessages}){

  return (
      <>
        {chatMessages.map(
                          (currentMessage)=>{
                             return (
                                      <Message 
                                        message={currentMessage.message} 
                                        sender={currentMessage.sender} 
                                        key={currentMessage.id}
                                      />
                                    )
                          }
                        )
      }
      </>
  );
  
}


function App() {
  const [chatMessages , setChatMessages] = React.useState([  //Array Destructuring
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
    <>
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages
        chatMessages={chatMessages}
      />
    </>
  )
}

export default App
