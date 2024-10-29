import { useState } from "react";
import LogoutModal from "./LogoutModal";


const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
        }


    return (
        <>
            <nav className="flex items-center justify-between border-b border-black p-4 shadow-md">
                <div className="text-black text-xl font-bold  ml-10 border border-customLightOrange rounded-md p-1.5 px-2.5 bg-customLightOrange">
                    <span className="text-white font-extrabold text-2xl">Go</span>Study
                </div>
                <div className="space-x-4">
                    <a href="#" className="text-black font-bold hover:underline transform transition-transform duration-200 mx-4">Home</a>
                    <a href="#" className="text-black font-bold hover:underline transform transition-transform duration-200 m-4">About</a>
                    <a href="#" className="text-black font-bold hover:underline mx-4">Contact</a>
                    <button onClick={handleModalOpen} href="#" className="text-black font-bold hover:underline mx-4">Logout</button>
                </div>

            </nav>
            {isModalOpen &&
                <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            }
        </>
    );
}

export default Navbar;
