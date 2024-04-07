import React from 'react';
import './App.css';
import UserList from './UserList';

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <>
      <div className="App-header">
        <h1>Users</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Recherche par nom ..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <UserList searchTerm={searchTerm} />
    </>
  );
}


export default App;
