// App.js
import { useState } from 'react';
import './App.css';
import UserDisplay from './component/UserDisplay';
import UserList from './component/UserList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateProfile from './component/UpdateProfile';
import NewUser from './component/NewUser';
import TeamCreate from './component/TeamCreate';
import TeamDetail from './component/TeamDetail';

function App() {

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUsers = (users) => {
    setSelectedUsers(users);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserList onSelectUsers={handleSelectUsers} />} />
        <Route path='/user/:id' element={<UserDisplay />} />
        <Route path='/userUpdate/:updateId' element={<UpdateProfile />} />
        <Route path='/newUser' element={<NewUser />} />
        <Route path='/createTeam' element={<TeamCreate selectedUsers={selectedUsers} onUpdateSelectedUsers={handleSelectUsers} />} />
        <Route path='/teamDetail' element={<TeamDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
