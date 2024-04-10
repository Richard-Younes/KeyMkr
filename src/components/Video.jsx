/** @format */

import './video.css';
import { useState, useRef, useEffect } from 'react';

// Add your desired time to skip forward and backward (in seconds)
const videoControl = 5;
const frameControl = 1;

// Socket connection

function Video({
	keyHolder,
	setKeyHolder,
	socket,
	keySize,
	setKeySize,
	FPS,
	setFPS,
}) {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// connecting to socket
	useEffect(() => {
		let canvas = document.getElementById('canvas');
		let context = canvas.getContext('2d');
		let video = document.getElementById('videoElement');

		if (isPlaying) {
			video.addEventListener('loadedmetadata', function () {
				canvas.height = video.videoHeight;
				canvas.width = video.videoWidth;
			});

			const intervalId = setInterval(() => {
				let width = video.width;
				let height = video.height;
				context.drawImage(video, 0, 0);
				let data = canvas.toDataURL('image/jpeg', 1);
				context.clearRect(0, 0, width, height);
				socket.emit('image', data, keySize);
			}, 1000 / FPS);

			socket.on('response_back_lava', function (key) {
				setKeyHolder(() => [...keyHolder, key]);
			});

			// Cleanup function for the setIterval to not stack up
			return () => clearInterval(intervalId);
		}
	}, [keyHolder, setKeyHolder, isPlaying, keySize, FPS, socket]);

	function handleTogglePlay() {
		if (videoRef.current.paused) {
			videoRef.current.play();
			setIsPlaying(true);
		} else {
			videoRef.current.pause();
			setIsPlaying(false);
		}
	}

	function handleForward() {
		videoRef.current.currentTime += videoControl;
	}

	function handleBackward() {
		videoRef.current.currentTime -= videoControl;
	}

	function handleForwardSkip() {
		videoRef.current.currentTime += frameControl;
	}

	function handleBackwardSkip() {
		videoRef.current.currentTime -= frameControl;
	}

	return (
		<div className='video-container'>
			<div className='controls-container'>
				<div className='three-col'>
					<p>Auto-generation</p>
				</div>

				<div className='two-col'>
					<p>Manual</p>
				</div>
				<p className='row-two-col'>Video Control</p>
				<p className=''>Key/sec</p>
				<p className=''>Key Length</p>
				<p className='row-2-col'>Frame control</p>
				<div className='control-btn-container'>
					<img
						src='../../public/play-back-outline.svg'
						alt='backward button'
						className='control-buttons control-buttons-backward'
						onClick={handleBackward}
					/>
					{isPlaying ? (
						<img
							src='../../public/pause-outline.svg'
							alt='play/pause button'
							className='control-buttons control-buttons-play'
							onClick={handleTogglePlay}
						/>
					) : (
						<img
							src='../../public/play-outline.svg'
							alt='play/pause button'
							className='control-buttons control-buttons-play'
							onClick={handleTogglePlay}
						/>
					)}
					<img
						src='../../public/play-forward-outline.svg'
						alt='forward button'
						className='control-buttons control-buttons-forward'
						onClick={handleForward}
					/>
				</div>

				<select
					name='keyPerSec'
					id='key-per-sec'
					onChange={e => setFPS(Number(e.target.value))}>
					<option value='1'>1</option>
					<option value='0.5'>0.5</option>
					<option value='0.25'>0.25</option>
				</select>
				<select
					name='keyLength'
					id='key-length'
					onChange={e => setKeySize(Number(e.target.value))}>
					<option value='256'>256</option>
					<option value='128'>128</option>
					<option value='64'>64</option>
					<option value='32'>32</option>
				</select>
				<div className='skip-btn-container'>
					<img
						src='../../public/play-skip-back-outline.svg'
						alt='backward button'
						className='control-buttons control-buttons-skip-backward'
						onClick={handleBackwardSkip}
					/>
					<img
						src='../../public/play-skip-forward-outline.svg'
						alt='play/pause button'
						className='control-buttons control-buttons-skip-forward'
						onClick={handleForwardSkip}
					/>
				</div>
			</div>
			<div width='78%' id='vid-container'>
				<video id='videoElement' width='100%' ref={videoRef} muted loop>
					<source src='../../static/LavaLampVid.mp4' type='video/mp4' />
					<canvas id='canvas' hidden></canvas>
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	);
}

export default Video;
