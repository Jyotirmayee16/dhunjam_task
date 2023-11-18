import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';

function App() {
  const [userToken, setUserToken] = useState(null);

  const handleLogin = (token) => {
    setUserToken(token);
  };

  return (
    <div className="App">
      {userToken ? (
        <Dashboard userToken={userToken} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
