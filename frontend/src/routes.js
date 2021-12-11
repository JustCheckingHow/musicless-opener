import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import ViewFileInfoPage from './pages/ViewFileInfoPage'
import AppPage from './pages/App';
// import IndexPage from './pages'

class App extends Component {
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route exact path="/opener" element={<ViewFileInfoPage />} />
					<Route exact path="/" element={<AppPage />} />
				</Routes>
			</Router>
		)
	}
}

export default App
