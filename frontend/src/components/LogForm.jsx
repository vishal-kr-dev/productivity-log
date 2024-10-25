const LogForm = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto border border-black  px-20">
            <div className="flex flex-col  items-center">
                <h2 className="text-xl font-bold mb-4">Log Form</h2>
            </div>
            <div className="flex itemsp-center justify-center">
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-lg">Web Dev</span>
                    </div>
                    <div className="flex items-center">s
                        <input type="checkbox" className="mr-2" />
                        <span className="text-lg">DSA</span>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-lg">Academics</span>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-lg">Others</span>
                    </div>
                </div>
                <div className="ml-4">
                    <textarea
                        className="w-full h-36 border border-gray-300 rounded-lg p-2 resize-none"
                        placeholder="Type your comments here..."
                    ></textarea>                </div>
            </div>
        </div>
    );
}

export default LogForm;
