import css from './index.css';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

if (module.hot) {
	module.hot.accept(<App />, function() {
		console.log('Accepting the updated printMe module!');
		document.body.removeChild(element);
		element = component(); // Re-render the "component" to update the click handler
		document.body.appendChild(element);
	});
}

render(<App />, document.getElementById('root'));
