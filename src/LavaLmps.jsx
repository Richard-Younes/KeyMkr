/** @format */
import Header from './components/Header';
import Video from './components/Video';
import Terminal from './components/Terminal';
import { useState } from 'react';

function LavaLmps({ keyHolder, setKeyHolder, socket }) {
	const [keySize, setKeySize] = useState(256);
	const [FPS, setFPS] = useState(1);

	return (
		<>
			<Header />
			<main>
				<Video
					keyHolder={keyHolder}
					setKeyHolder={setKeyHolder}
					socket={socket}
					FPS={FPS}
					keySize={keySize}
					setFPS={setFPS}
					setKeySize={setKeySize}
				/>
				<Terminal
					keyHolder={keyHolder}
					setKeyHolder={setKeyHolder}
					socket={socket}
					keySize={keySize}
				/>
			</main>
		</>
	);
}

export default LavaLmps;
