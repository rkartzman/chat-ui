import React from 'react';
import ReactDOM from 'react-dom';
import io from "socket.io-client";



class Chatroom extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chats: [
				
			]
		}
		this.submitMessage = this.submitMessage.bind(this);
	}
	submitMessage(e) {
		e.preventDefault();
		const socket = io("https://spotim-demo-chat-server.herokuapp.com");
		socket.emit('spotim/chat', { avatar: 'https://avatars.io/platform/userId', username: 'Remy K', text: ReactDOM.findDOMNode(this.refs.msg).value } );
		socket.on('spotim/chat', (msg) => {
			// console.log('hey message');
			// console.log(msg);
			this.setState({
				chats: this.state.chats.concat([{
					avatar: 'https://avatars.io/platform/userId',
					username: 'Remy K',
					text: ReactDOM.findDOMNode(this.refs.msg).value,
				}])
			}, () => {
				ReactDOM.findDOMNode(this.refs.msg).value = '';
			})
		})
	}
	render() {
		const username = 'Remy K';

		const {chats} = this.state;
		const socket = io("https://spotim-demo-chat-server.herokuapp.com");
		socket.on('connection', function(socket){
			console.log(socket);
		});
		socket.on('spotim/chat', (msg) => {
			// console.log('hey message');
			// console.log(msg);
			this.setState({
				chats: this.state.chats.concat([{
					avatar: 'https://avatars.io/platform/userId',
					username: 'Remy K',
					text: ReactDOM.findDOMNode(this.refs.msg).value,
				}])
			}, () => {
				ReactDOM.findDOMNode(this.refs.msg).value = '';
			})
		})
		
		return (
			<div className="chatroom"> 
				<h1> Chatterbox </h1>
				<ul className="chats" ref="chats">
					{
						chats.map((chat) => 
							 <li className="chat">
					      <span><img src={chat.avatar} alt="altText" />{chat.username}</span>

					      <p>{chat.text}</p>
					    </li>
						)
					}
				</ul>
				<form className="input" onSubmit={(e) => this.submitMessage(e)}>
					<div className="input__wrapper">
						<div className="input__un-wrapper">	
							<label>Username:</label>
							<input type="text" ref="username" />
						</div>

						<input type="textarea" ref="msg" />
						<input type="submit" value="submit" className="btn btn--primary"/>
					</div>
				</form>
			</div>
		); 
	}
}

export default Chatroom;