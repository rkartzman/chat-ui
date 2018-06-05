import React from 'react';

const Message = ({chat, user, index}) => (
	<li className={`chat-message ${user === chat.username ? "right" : "left" }` }>
    <span className="message-avatar"><img src={chat.avatar} alt="altText" /></span>
    <h4 className="h4">{chat.username}</h4>

    <p className="message">{chat.text}</p>
  </li>
);

export default Message;