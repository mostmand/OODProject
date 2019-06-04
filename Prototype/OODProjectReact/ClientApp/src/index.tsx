import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './semantic/dist/semantic.min.css';
import './style/custom.scss';
import './style/calendar.scss';
import { createBrowserHistory } from 'history';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const rootElement = document.getElementById('root');

var app = <App history={createBrowserHistory({ basename: baseUrl, forceRefresh: true })} />;

var element = <BrowserRouter basename={baseUrl}>
  {app}
</BrowserRouter>;

ReactDOM.render(
  element,
  rootElement);

registerServiceWorker();
