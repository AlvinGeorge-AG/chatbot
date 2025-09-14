import '../App.css'
import bot from '../assets/bot.png'
import user from '../assets/user.png'

function Message(props){ // or we can use Message({message,sender}) as an even simple shortcut , since the first parameter is props , destructuring takes there itself.

  const {message , sender} = props;

  return (
    <div className={
            sender === 'user'
              ? 'chat-message-user'
              : 'chat-message-robot'
          }>
      {sender==='bot' && <img className="chat-message-profile"  src={bot} />}
      <div className="chat-message-text" >{message}</div>
      {sender==='user' && <img className="chat-message-profile" src={user} />}
    </div>
  );
}

export default Message;