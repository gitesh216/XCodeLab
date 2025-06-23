import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
    isExecuting: false,
    submission: null,

    executeCode: async(source_code, language_id, stdin, expected_outputs, problemId) => {
        try {
            set({isExecuting: true});
            console.log("Submission data", { source_code, language_id, stdin, expected_outputs, problemId });
            const res = await axiosInstance.post("/execute-code", { source_code, language_id, stdin, expected_outputs, problemId })
            console.log("submission: ", res.data);
            set({ submission: res.data.data });
            console.log("submission: ", res.data.data);
            
            console.log("ExecutionStore Submission data", res.data.data);
            toast.success(res.data.message);
        } 
        catch (error) {
            console.log("Error in executing code", error);
            toast.error("Error executing code");
        }
        finally {
            set({isExecuting: false});
        }
    }
}));