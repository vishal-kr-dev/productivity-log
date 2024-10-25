import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import useSessionStore from '../Store/sessionStore';

const TimerComponent = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [status, setStatus] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const addSession = useSessionStore((state) => state.addSession);
    const [comments, setComments] = useState('')

    const handleAddSession = () => {
        
    }

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const handleButtonClick = () => {
        setIsRunning((prev) => !prev);
        setStatus((prev) => !prev);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return hours > 0
            ? `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`
            : `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsRunning(false);
        setSeconds(0);
        const newSession = {
            id: Date.now(),
            duration: seconds,
            type: selectedOption,
            comments: comments
        }
        addSession(newSession);
        console.log(newSession);
        toast.success("Submitted Successfully");
        setSelectedOption('')
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <button
                onClick={handleButtonClick}
                className={`flex items-center justify-center flex-col w-40 h-40 rounded-full text-white font-extrabold m-5
      ${isRunning ? 'bg-customOrange' : 'bg-customLightOrange'} transition duration-300 border border-black`}
            >
                <div className='text-4xl text-black'>
                    {formatTime(seconds)}
                </div>
                <div className='mt-5 text-xl text-black'>
                    {status ? <div>Pause</div> : <div>Start</div>}
                </div>
            </button>

            <div className="flex flex-col p-6 bg-white rounded-lg shadow-md max-w-md mx-auto border border-black px-20 border-b-4 border-r-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Log Form</h2>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col space-y-3 items-center justify-center">
                        {["Web Dev", "DSA", "Academics", "Others"].map(option => (
                            <div key={option} className="flex items-center">
                                <input
                                    type="radio"
                                    id={option}
                                    name="studyOption"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    className="hidden peer" // Hide the default radio button
                                />
                                <label
                                    htmlFor={option}
                                    className="flex items-center justify-center cursor-pointer p-4 w-40 h-12 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200 peer-checked:bg-customOrange peer-checked:text-white"
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="ml-4">
                        <textarea value={comments} onChange={(e) => setComments(e.target.value)}
                            className="w-44 h-56 border border-gray-300 rounded-lg p-2 resize-none"
                            placeholder="Type your comments here..."
                        ></textarea>
                    </div>
                </div>
                <button onClick={handleSubmit} className='py-3 border border-black m-5 text-xl font-bold hover:scale-110 transition rounded-xl'>
                    Submit
                </button>
            </div>
            <ToastContainer 
                position="top-center"
                draggable
                theme="light"
                newestOnTop="true"
            />
        </div>
    );
};

export default TimerComponent;
