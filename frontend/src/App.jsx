import { useEffect, useState } from 'react';
import './App.css';
import TimerComponent from './components/Timer';
import Navbar from './components/Navbar';
import LeftSideBar from './components/LeftSideBar';
import LogForm from './components/LogForm';
import { useNavigate } from 'react-router-dom';
import useSessionStore from './Store/sessionStore';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  useEffect(() => {
    if(!isAuthenticated)
      // console.log("This is the isAuthenticated", isAuthenticated);
      navigate('/login')
  })

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 m-4 overflow-hidden">
        <LeftSideBar />
        <div className="flex-grow overflow-auto flex flex-col items-center ">

          <TimerComponent />
          {/* <LogForm/> */}
        </div>
      </div>
    </div>
  );
}

export default App;
