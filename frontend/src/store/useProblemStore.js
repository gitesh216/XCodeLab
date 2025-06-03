import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problems/get-all-problems");
      console.log("data.data", res.data.data);
      set({ problems: res.data.data });
    } catch (error) {
      console.log("Error in getting all problems", error);
      toast.error("Error getting all problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (problemId) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problems/get-problem/${problemId}`);
      set({ problem: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in getting problem by id", error);
      toast.error("Error getting problem by id");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problem");
      set({ solvedProblems: res.data.data });
    } catch (error) {
      console.log("Error in getting solved problems", error);
      toast.error("Error getting solved problems");
    }
  },
}));
