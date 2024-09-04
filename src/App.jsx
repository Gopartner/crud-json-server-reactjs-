import React from 'react';
import UserList from './components/organisms/UserList';

function App() {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">CRUD Application</h1>
      </header>
      <main className="p-4">
        <UserList />
      </main>
    </div>
  );
}

export default App;

