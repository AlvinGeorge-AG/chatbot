import  { useState} from "react";
import '../App.css'
import { Chatbot } from "supersimpledev";

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

export default ChatInput