/** @format */

import Header from './components/Header';
import Terminal from './components/Terminal';
import Mouse from './components/Mouse';
import { useEffect, useState } from 'react';

function MouseMvmt({ socket, mouseKeyHolder, setMouseKeyHolder }) {
	const [startMouse, setStartMouse] = useState(false);
	const [positions, setPositions] = useState([]);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [buffer, setBuffer] = useState(256);
	useEffect(() => {
		if (startMouse) {
			const intervalId = setInterval(() => {
				setPositions(prevPositions => [
					...prevPositions,
					[position.x, position.y],
				]);
			}, 1);

			return () => clearInterval(intervalId);
		}
	}, [positions, position.x, position.y, startMouse]);

	const handleMouseMove = event => {
		setPosition({ x: event.clientX, y: event.clientY });
	};

	// Mouse movement

	useEffect(() => {
		if (socket && startMouse && positions.length > buffer) {
			socket.emit('mouse-list', positions);

			socket.on('response_back_mouse', function (key) {
				setMouseKeyHolder(() => [...mouseKeyHolder, key]);
			});

			setPositions([]);
		}
	}, [
		mouseKeyHolder,
		setMouseKeyHolder,
		socket,
		startMouse,
		positions,
		buffer,
	]);

	return (
		<>
			<Header />
			<main>
				<Mouse
					handleMouseMove={handleMouseMove}
					startMouse={startMouse}
					setStartMouse={setStartMouse}
					setBuffer={setBuffer}
					buffer={buffer}
					positions={positions}
				/>
				<Terminal mouseKeyHolder={mouseKeyHolder} />
			</main>
		</>
	);
}

export default MouseMvmt;
