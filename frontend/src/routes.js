import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ViewFileInfo from './components/ViewFileInfo';

import AppPage from './pages/App';
// import IndexPage from './pages'

class App extends Component {
	DETAILS_END_POINT = 'http://localhost:3001/file'
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route path="/opener/*" element={<ViewFileInfo endpoint={this.DETAILS_END_POINT} />} />
					<Route exact path="/" element={<AppPage />} />
				</Routes>
			</Router>
		)
	}
}

export default App
