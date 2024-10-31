import { useEffect, useState } from 'react';
import './App.css';
import TimerComponent from './components/Timer';
import Navbar from './components/Navbar';
import LeftSideBar from './components/LeftSideBar';
import LogForm from './components/LogForm';
import { useNavigate } from 'react-router-dom';
import useSessionStore from './Store/sessionStore';
import { LineChart } from 'lucide-react';
import LineChartComponent from './components/LineChart';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const {isAuthenticated} = useSessionStore();

  useEffect(() => {
    if (!isAuthenticated)
      // console.log("This is the isAuthenticated", isAuthenticated);
      navigate('/login')
  })

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 m-4 overflow-hidden">
        <LeftSideBar />
        <div className="flex-grow overflow-auto flex flex-col items-center">
          <div className="flex flex-col items-center w-full">
            {/* Line Chart Component */}
            <div className="flex-grow flex items-center justify-center">
              <LineChartComponent />
            </div>
  
            {/* Timer Component */}
            <div className="flex items-center justify-center w-full ">
              <TimerComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App;
