import axios from 'axios';
import { create } from 'zustand';

const useSessionStore = create((set) => {
    // const baseURL = import.meta.env.VITE_BASE_URL;
    const baseURL = import.meta.env.VITE_BACK_URL;
    console.log("This is the baseURL", baseURL);
    const token = localStorage.getItem('token');
    console.log("This is the token from store", token);
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
                const response = await axios.post(`${baseURL}/login`, data);
                // const response = await axios.post("http://localhost:3000/login", data);
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
        submitSession: async (data) => {
            if(!isAuthenticated) {
                console.log("This is not authenticated meaning isAuthenticated is false")
                return false;
            }
            try{
                console.log(token, "This is the token");
                const response = await axios.post(`${baseURL}/addSession`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("This is running")
                console.log(response.data, "This is response.data")
                return response.data

            }catch(e){
                console.log("Error submitting session Data", e)
            }
        },
        sessions: [],
        addSession: (sessionData) => set((state) => ({ sessions: [...state.sessions, sessionData] })),
        getSessions: async () => {
            if(!isAuthenticated)
                return
            try{
                const response = await axios.get(`${baseURL}/getSession`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("This is in zustand store", typeof useSessionStore.getState().sessions)
                console.log("This is the payload from backend", response.data);
                set({ sessions: response.data });
                console.log("This is the final state", useSessionStore.getState())

            }catch(error){
                console.log(error)
            }
        }
    };
});

export default useSessionStore;
