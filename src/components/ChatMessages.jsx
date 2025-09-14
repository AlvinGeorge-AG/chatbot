import  { useRef,useEffect } from "react";
import '../App.css'
import Message from "./Message";

function ChatMessages({chatMessages}){

  const chatMessagesRef = useRef(null);

   useEffect(()=>{
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

export default ChatMessages;