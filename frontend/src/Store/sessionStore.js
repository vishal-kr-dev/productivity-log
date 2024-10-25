import axios from 'axios';
import { create } from 'zustand';

const useSessionStore = create((set) => {
    const token = localStorage.getItem('token');
    // const userData = localStorage.getItem('user'); // Fetch user data
    // const user = userData ? JSON.parse(userData) : null; // Check if userData exists before parsing
    const isAuthenticated = !!token;

    return {
        token: token,
        // user: user || null,
        isAuthenticated: isAuthenticated,
        loginError: null,
        login: async (data) => {
            set({ loginError: '' });
            try {
                const response = await axios.post("http://localhost:3000/login", data);
                console.log("This is the response: ", response);
                if (response.status === 200) {
                    const { token, } = response.data;
                    if (token) {
                        console.log("This is the if statement");
                        localStorage.setItem('token', token);
                        // localStorage.setItem('user', JSON.stringify(user));
                        set({
                            isAuthenticated: true,
                            token,
                            
                            loginError: null
                        });
                        console.log("This is the new updated state", useSessionStore.getState());
                    } else {
                        throw new Error("User data is not valid");
                    }
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 400) {
                        set({ loginError: error.response.data.message });
                    } else {
                        set({ loginError: "An unexpected error occurred" });
                    }
                } else {
                    set({ loginError: "Network Error: Try again later" });
                }
            }
        },
        logout: (navigate) => {
            set({ token: null, user: null, isAuthenticated: false });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        },
        sessions: [],
        addSession: (sessionData) => set((state) => ({ sessions: [...state.sessions, sessionData] }))
    };
});

export default useSessionStore;
