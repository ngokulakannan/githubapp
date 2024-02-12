
import './App.css';
import { Outlet } from 'react-router-dom'

import UserContext from './store/UserContext'
import Header from './components/Header';

function App() {
  return (
    <UserContext  >
      <div className="App">
        <Header></Header>
        
        <Outlet></Outlet>
      </div>
    </UserContext>
  );
}



export default App;
