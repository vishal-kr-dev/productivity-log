const LeftSideBar = () => {
    return (
        <div className="w-1/10 bg-gray-200 h-full sticky top-0 px-5 pt-4 shadow-md border border-black rounded-xl">
            <div className="flex flex-col items-center ">
                <h2 className="text-xl font-bold mb-4">History</h2>
                <ul className="space-y-2 flex flex-col justify-center items-center ">
                    <li className="border border-black px-16 py-4 rounded-xl hover:scale-105 transition">
                        <a href="#" className="text-black hover:underline">21-09-2024</a>
                    </li>
                    <li className="border border-black px-16 py-4 rounded-xl hover:scale-105 transition">
                        <a href="#" className="text-black hover:underline">21-09-2024</a>
                    </li>
                    <li className="border border-black px-16 py-4 rounded-xl hover:scale-105 transition">
                        <a href="#" className="text-black hover:underline">21-09-2024</a>
                    </li>
                    <li className="border border-black px-16 py-4 rounded-xl hover:scale-105 transition">
                        <a href="#" className="text-black hover:underline">21-09-2024</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LeftSideBar;
