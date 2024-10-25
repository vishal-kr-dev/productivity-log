import React from 'react';
import useSessionStore from '../Store/sessionStore'; // Adjust the import based on your structure

const LogoutModal = ({ isOpen, onClose }) => {
    // Access the logout function directly within the component
    const logout = useSessionStore((state) => state.logout);

    const handleLogout = () => {
        logout(); // Call the logout function
        onClose(); // Close the modal after logging out
    };

    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
