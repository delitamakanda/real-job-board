import React from 'react';
import ReactDOM from 'react-dom';
import "react-markdown-editor-lite/lib/index.css";
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { IntlProvider } from 'react-intl';
import { messages } from './translations';

const store = configureStore();

const locale = 'fr';

const app = (
    <Provider store={store}>
        <IntlProvider locale={locale} messages={messages[locale]}>
            <App />
        </IntlProvider>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
