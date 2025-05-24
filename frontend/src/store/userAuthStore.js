import  { create } from "zustand"
import  { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const userAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({isCheckingAuth: true});
        try {
            const res = await axiosInstance.get("/auth/getUser");
            console.log("Checkauth response", res.data);
            set({authUser: res.data.user})    
        }
        catch (error) {
            console.log("Error in checking auth", error);
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigninUp: true});
        try {
            const res = await axiosInstance.post("/auth/register", data);
            
            set({authUser: res.data.user});
            toast.success(res.data.message);
        }
        catch (error) {
            console.log("Error in signup", error);
            toast.error("Error signing up");
        }
        finally{
            set({isSigninUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data.user});
            toast.success(res.data.message);
        }
        catch (error) {
            console.log("Error in login", error);
            toast.error("Error logging in");
        }
        finally{
            set({isLoggingIn: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get("/auth/logout");  
            set({authUser: null});
            toast.success("Logged out successfully");  
        }
        catch (error) {
            console.log("Error in logout", error);
            toast.error("Error logging out");
        }
    }

}));