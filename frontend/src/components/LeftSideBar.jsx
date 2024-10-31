import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import useSessionStore from "../Store/sessionStore";
// import '../../src/App.css'

const LeftSideBar = () => {
    // const getSessions = useSessionStore((state) => state.getSessions);
    const { sessions, getSessions, submitSession, loading, isAuthenticated } = useSessionStore();
    // const [cards, setCards] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("This is is Authenticated from leftsidebar", isAuthenticated);
            getSessions();
        }

        console.log("This is sessions from leftSidebar componenet", sessions);
    }, [getSessions, isAuthenticated]);

    useEffect(() => {
        console.log("Sessions:", sessions); // Log sessions
        // console.log(sessions[0].createdAt);
        // setCards(sessions);
    }, [sessions,]);


    return (
        loading ? (
            <div className="w-1/8 bg-gray-200 h-full sticky top-0 px-5 pt-4 shadow-md border border-black rounded-xl overflow-y-auto scrollbar-hidden flex justify-center items-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >lofa...</span>
                </div>
            </div>
        ) : (
            <div className="w-1/8 bg-gray-200 h-full sticky top-0 px-5 pt-4 shadow-md border border-black rounded-xl overflow-y-auto scrollbar-hidden">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">History</h2>
                    {
                        sessions.slice(0, 50).reverse().map((session) => (
                            <div key={session._id} className="transition duration-300">
                                <HistoryCard
                                    date={session.createdAt}
                                    duration={session.duration}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    );
}

export default LeftSideBar;
