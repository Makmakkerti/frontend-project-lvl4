import React from 'react';

export const UserNameContext = React.createContext({
  username: 'anonymous',
});

export const I18nContext = React.createContext({
  i18next: null,
});
