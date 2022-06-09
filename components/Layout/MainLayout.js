import React from 'react';
import Navigation from './Navigation';
import Nav from './ContextNav';
import Footer from './Footer';

const MainLayout = ({ children, usuario }) => {
	return (
		<div>
			<Navigation usuario={usuario} />
			<Nav />
			{children}
			<Footer />
		</div>
	);
};

export default MainLayout;
