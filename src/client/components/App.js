import React from 'react';

import bgImage from '../assets/bg.jpeg';
import classes from './App.css';

const App = props => (
	<div className={classes.App}>
		<img
			src="https://cdn-images-1.medium.com/max/1600/1*9IXiJMp60QAt3MP0R8qX_A.png"
			alt="Webpack"
		/>
		<div className={classes.Headline}>Webpack 101</div>
	</div>
);

export default App;
