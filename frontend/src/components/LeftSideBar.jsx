import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import useSessionStore from "../Store/sessionStore";
// import '../../src/App.css'

const LeftSideBar = () => {
    // const getSessions = useSessionStore((state) => state.getSessions);
    const { sessions, getSessions, submitSession } = useSessionStore();
    // const [cards, setCards] = useState([]);

    useEffect(() => {
        getSessions();
        console.log(sessions);
    }, [getSessions, sessions.length]);

    useEffect(() => {
        console.log("Sessions:", sessions); // Log sessions
        // console.log(sessions[0].createdAt);
        // setCards(sessions);
    }, [sessions,]);

    return (
        <div className="w-1/8 bg-gray-200 h-full sticky top-0 px-5 pt-4 shadow-md border border-black rounded-xl overflow-y-auto scrollbar-hidden">
            <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">History</h2>
                {
                    sessions.slice(0, 10).reverse().map((session) => {


                        return (
                            <div key={session._id} className="transition duration-300">
                                <HistoryCard
                                    date={session.createdAt}
                                    duration={session.duration}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default LeftSideBar;
