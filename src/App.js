import React from 'react';
import './styles/main.scss';
import TextInput from './components/TextInput';

function App() {
  return (
    <div className="container">
      <div className="form-components">
        <TextInput
          label="Username"
          placeholder="Enter your username"
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          error="Please enter a valid email address"
          required
        />
      </div>
    </div>
  );
}

export default App;
