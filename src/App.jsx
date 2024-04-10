/** @format */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LavaLmps from './LavaLmps';
import MouseMvmt from './MouseMvmt';
import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
	const [keyHolder, setKeyHolder] = useState([]); // [key1, key2, key3, ...]
	const [mouseKeyHolder, setMouseKeyHolder] = useState([]); // [key1, key2, key3, ...
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socket = io('http://127.0.0.1:5000');
		setSocket(socket);
		socket.on('connect', function () {
			console.log('Connected...!', socket.connected);
		});

		return () => {
			socket.disconnect(); // Clean up on unmount
		};
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<LavaLmps
							keyHolder={keyHolder}
							setKeyHolder={setKeyHolder}
							socket={socket}
						/>
					}
				/>
				<Route
					path='mouse'
					element={
						<MouseMvmt
							mouseKeyHolder={mouseKeyHolder}
							setMouseKeyHolder={setMouseKeyHolder}
							socket={socket}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
