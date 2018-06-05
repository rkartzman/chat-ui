import React from 'react';
import {slugify} from '../helpers.js';
const Message = ({chat, user}) => (
	<li data-username={slugify(chat.username)} data-user={slugify(user)} className={`chat-message ${slugify(user) === slugify(chat.username) ? "currentUser" : "defaultUser" }` }>
    <span className="message-avatar"><img src={chat.avatar} alt="altText" /></span>
    <h4 className="h4">{chat.username}</h4>

    <p className="message">{chat.text}</p>
  </li>
);

export default Message;