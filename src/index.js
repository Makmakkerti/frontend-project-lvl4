import ReactDOM from 'react-dom';
import i18next from 'i18next';
import en from './locales/en';
import init from './init';

i18next.init({
  lng: 'en',
  debug: false,
  resources: {
    en,
  },
}).then(() => {
  ReactDOM.render(init(), document.querySelector('#chat'));
});
