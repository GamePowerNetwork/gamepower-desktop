import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './views/app/App';
import CustomThemeProvider from './themes/CustomThemeProvider';
import { Provider } from 'react-redux';
import { configureStore } from './application/store';
import services from './infrastructure/services';

const customTitlebar = require('custom-electron-titlebar');

new customTitlebar.Titlebar({
	backgroundColor: customTitlebar.Color.fromHex('#321854'),
  titleHorizontalAlignment: 'right'
});


ReactDOM.render(
  <Provider store={configureStore(services)}>
    <CustomThemeProvider>
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </Provider>,
  document.getElementById('root')
);