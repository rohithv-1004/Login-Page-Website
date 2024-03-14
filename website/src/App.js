import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    // Generate initial captcha when component mounts
    setCaptcha(generateCaptcha());
  }, []);

  const generateCaptcha = () => {
    // Logic to generate a new captcha
    return Math.random().toString(36).substring(7);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captcha === userCaptcha) {
      setLoginSuccess(true);
    } else {
      setLoginAttempted(true);
    }
  };

  const handleCaptchaChange = (e) => {
    setUserCaptcha(e.target.value);
  };

  const handleRefreshCaptcha = () => {
    // Refresh captcha
    setCaptcha(generateCaptcha());
  };

  const handleLoginAgain = () => {
    setLoginAttempted(false);
  };

  return (
    <div className="App">
      <div className="login-container">
        <h1 className="login-title">LOGIN PAGE</h1>
        {loginSuccess ? (
          <div className="success-container">
            <h2 className="success-title">Welcome, {username}!</h2>
            <p className="success-message">You have successfully logged in.</p>
            <button className="logout-button" onClick={() => setLoginSuccess(false)}>Logout</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <div className="captcha-container">
                <label htmlFor="captchaInput">Enter Captcha:</label>
                <input
                  id="captchaInput"
                  type="text"
                  value={userCaptcha}
                  onChange={handleCaptchaChange}
                />
                <span className="captcha">{captcha}</span>
                <button type="button" onClick={handleRefreshCaptcha}>
                  Refresh Captcha
                </button>
              </div>
              <br />
              <button type="submit">Login</button>
            </form>
            {loginAttempted && (
              <div className="error">
                <h2>Invalid Captcha</h2>
                <p>Please enter the correct captcha and try again.</p>
                <button onClick={handleLoginAgain}>Login Again</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
