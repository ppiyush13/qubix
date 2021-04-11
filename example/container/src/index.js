import React from 'react';
import ReactDOM from 'react-dom';
import qubix from 'qubix';
import GlobalStyles from './global-styles';
import App from './App';

/**
 * Register micro-frontends
 */
qubix.register({
    'micro-frontend': 'http://localhost:5000/',
});

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
