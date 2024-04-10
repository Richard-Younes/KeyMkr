/** @format */
import { useEffect } from 'react';
import './Terminal.css';
import { useLocation } from 'react-router-dom';

function Terminal({
	keyHolder,
	socket,
	setKeyHolder,
	keySize,
	mouseKeyHolder,
}) {
	// Lava lamp code
	let reversedKeyHolder;
	function handleGenerateKey() {
		let canvas = document.getElementById('canvas');
		let context = canvas.getContext('2d');
		let video = document.getElementById('videoElement');

		video.addEventListener('loadedmetadata', function () {
			canvas.height = video.videoHeight;
			canvas.width = video.videoWidth;
		});

		let width = video.width;
		let height = video.height;
		context.drawImage(video, 0, 0);
		let data = canvas.toDataURL('image/jpeg', 1);
		context.clearRect(0, 0, width, height);
		socket.emit('image', data, keySize);

		socket.on('response_back_lava', function (key) {
			setKeyHolder(() => [...keyHolder, key]);
		});
	}
	if (keyHolder) {
		reversedKeyHolder = [...keyHolder].reverse();
	}

	// Mouse code
	let reversedMouseKeyHolder;
	if (mouseKeyHolder) {
		reversedMouseKeyHolder = [...mouseKeyHolder].reverse();
	}

	const location = useLocation();
	return (
		<div className='Terminal-container'>
			<div className='key-container'>
				{location.pathname === '/'
					? reversedKeyHolder.map((val, index) => (
							<Key
								key={index}
								value={val}
								index={reversedKeyHolder.length - index - 1}
							/>
					  ))
					: null}
				{location.pathname === '/mouse'
					? reversedMouseKeyHolder.map((val, index) => (
							<Key
								key={index}
								value={val}
								index={reversedMouseKeyHolder.length - index - 1}
							/>
					  ))
					: null}
			</div>

			{location.pathname === '/' ? (
				<button className='generate-key' onClick={handleGenerateKey}>
					Generate Key
				</button>
			) : null}
		</div>
	);
}
function Key({ index, value }) {
	return (
		<div className='key'>
			<p className='key-paragraph'>
				<span className='key-symbols'>/~$</span>Key #{index + 1} →
			</p>
			<p className='key-paragraph'>{value}</p>
		</div>
	);
}

export default Terminal;
