import React from 'react';

import Main from '../components/layout/Main';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';


export default function Layout({ children }) {
	return (
		<div>
		{/* // <div className="relative overflow-hidden bg-gray-100">
			// <div className="flex flex-col min-h-screen mx-auto my-0 overflow-hidden bg-white shadow-2xl max-w-screen-2xl"> */}
				<Header />
				<Main>{children}</Main>
				<Footer />
			{/* // </div>
		// </div> */}
		</div>
	)
}
