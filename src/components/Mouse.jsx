/** @format */

import style from './Mouse.module.css';

function Mouse({
	startMouse,
	setStartMouse,
	setBuffer,
	buffer,
	handleMouseMove,
	positions,
}) {
	function handleToggle() {
		setStartMouse(() => !startMouse);
	}

	const handleBufferChange = event => {
		const selectedBuffer = parseInt(event.target.value);
		setBuffer(selectedBuffer);
	};

	return (
		<div className={style.mouseContainer}>
			<div
				className={style.mouseMovementContainer}
				onMouseMove={handleMouseMove}>
				{positions.map((pos, index) => (
					<div
						key={index}
						style={{
							position: 'absolute',
							width: '4px',
							height: '4px',
							background: 'black',
							borderRadius: '50%',
							left: `${pos[0] - 60}px`,
							top: `${pos[1] - 104}px`,
						}}></div>
				))}
				<img className={style.mouseIcon} src='mouse.svg' alt='mouse icon' />
			</div>
			<div className={style.controls}>
				<div>
					<p>Max Buffer Size</p>
					<select
						name=''
						className={style.keyLength}
						value={buffer}
						onChange={handleBufferChange}>
						<option value='256'>256</option>
						<option value='512'>512</option>
						<option value='1024'>1024</option>
					</select>
				</div>

				<div className={style.logoContainerParent}>
					<p>Start/Stop Recording</p>
					<div className={style.logoContainer}>
						<img
							src={!startMouse ? 'play-outline.svg' : 'pause-outline.svg'}
							alt='pause logo'
							className={style.logo}
							onClick={handleToggle}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Mouse;
