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
  const { isAuthenticated, loading } = useSessionStore();

  useEffect(() => {
    if (!isAuthenticated)
      // console.log("This is the isAuthenticated", isAuthenticated);
      navigate('/login')
  })

  return (
    <div className="flex flex-col lg:h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row m-4">
        <LeftSideBar className="order-last lg:order-first h-[200px]" />
        {/* <div className="flex-grow overflow-auto flex flex-col items-center"> */}
        <div className="overflow-auto flex flex-col items-center order-first lg:order-last">
          <div className="flex flex-col items-center w-full">
            {/* Line Chart Component */}
            {
              loading ? (
                <div className='w-[1000px] h-[180px] bg-gray-300 rounded-lg flex justify-center items-center'>
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-screen lg:w-auto h-auto">
                  <LineChartComponent />
                </div>
              )
            }


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
