import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BBS from './BBS';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BBS />, document.getElementById('root'));
registerServiceWorker();
