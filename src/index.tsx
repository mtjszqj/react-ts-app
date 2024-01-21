import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { Amplify } from 'aws-amplify';
import {
  fetchAuthSession,
  getCurrentUser
} from 'aws-amplify/auth';
import awsExports from './aws-exports';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: awsExports.USER_POOL_ID,
      userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID
    }
  }
})


const getAuthenticatedUser = async () => {
  const {
    username,
    signInDetails
  } = await getCurrentUser();

  const {
    tokens: session
  } = await fetchAuthSession();

  // Note that session will no longer contain refreshToken and clockDrift
  return session?.idToken?.toString();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Authenticator>
      {({ signOut, user }) => {
        getAuthenticatedUser().then(console.log)
        return (
          <div>
            <p>Welcome {user?.username}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )
      }
      }
    </Authenticator>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
