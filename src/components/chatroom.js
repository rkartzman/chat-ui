import React from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";
import Message from './message.js';


class Chatroom extends React.Component {
	constructor(props) {
		super(props);
		console.log('initialize chatroom Component');

		this.state = {
			chats: [
				
			]
		}

		this.socket = io("https://spotim-demo-chat-server.herokuapp.com");
		this.socket.on('spotim/chat', (msg) => {
			this.setState({
				chats: this.state.chats.concat([{
					avatar: msg.avatar,
					username: msg.username,
					text: msg.text,
				}])
			}, this.clearFormFields)
		})

		this.submitMessage = this.submitMessage.bind(this);
	}
	clearFormFields() {
		ReactDOM.findDOMNode(this.refs.msg).value = '';
		ReactDOM.findDOMNode(this.refs.username).value = '';
	}
	submitMessage(e) {
		e.preventDefault();
		this.socket.emit('spotim/chat', { avatar: 'https://avatars.io/platform/userId', username: ReactDOM.findDOMNode(this.refs.username).value, text: ReactDOM.findDOMNode(this.refs.msg).value } );
	}
	render() {
		const username = '';

		const {chats} = this.state;
		
		return (
			<div className="chatroom"> 
				<div className="chat__wrap">
				<ul className="chats" ref="chats">
					{
						chats.map((chat, index) => 
							<Message chat={chat} user={username} key={index.toString()}  />
							 
						)
					}
				</ul>
				</div>
				<form className="input" onSubmit={(e) => this.submitMessage(e)}>
					<div className="input__wrapper">
						<div className="input__un-wrapper">	
							<input type="text" ref="username" placeholder="nickname" />
						</div>
						<div className="input__message-wrapper">
							<input type="textarea" ref="msg" placeholder="speak your mind"/>
							<input type="submit" value="send" className="btn btn--primary"/>
						</div>
					</div>
				</form>
			</div>
		); 
	}
}

export default Chatroom;