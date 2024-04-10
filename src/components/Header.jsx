/** @format */

import { Link } from 'react-router-dom';
import './Header.css';
function Header() {
	return (
		<header>
			<nav>
				<h1>/~$KeyMkr</h1>

				<div className='nav-link-container'>
					<Link to='/'>$LavaLmps</Link>
					<Link to='/mouse'>$MouseMvmt</Link>
					<Link to='/about'>$AboutUs</Link>
				</div>
			</nav>
		</header>
	);
}

export default Header;
