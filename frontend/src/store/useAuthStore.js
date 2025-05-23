import  { create } from "zustand"
import  { axiosInstance } from "../lib/axios.js"

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
    }
}));