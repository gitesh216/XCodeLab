import React, { useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";

const SubmissionsList = ({ submissions, isLoading }) => {
  // Helper function to safely parse JSON strings
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className="text-center p-8">
        <div className="text-base-content/70">No submissions yet</div>
      </div>
    );
  }
  const sortedSubmissions = [...submissions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    // <div className="space-y-4">
    //   {sortedSubmissions.map((submission) => {
    //     const avgMemory = calculateAverageMemory(submission.memory);
    //     const avgTime = calculateAverageTime(submission.time);

    //     return (
    //       <div
    //         key={submission.id}
    //         className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow rounded-lg"
    //       >
    //         <div className="card-body p-4">
    //           <div className="flex items-center justify-between">
    //             {/* Left Section: Status and Language */}
    //             <div className="flex items-center gap-4">
    //               {submission.status === "ACCEPTED" ? (
    //                 <div className="flex items-center gap-2 text-success">
    //                   <CheckCircle2 className="w-6 h-6" />
    //                   <span className="font-semibold">Accepted</span>
    //                 </div>
    //               ) : (
    //                 <div className="flex items-center gap-2 text-error">
    //                   <XCircle className="w-6 h-6" />
    //                   <span className="font-semibold">{submission.status}</span>
    //                 </div>
    //               )}
    //               <div className="badge badge-neutral">
    //                 {submission.language}
    //               </div>
    //             </div>

    //             {/* Right Section: Runtime, Memory, and Date */}
    //             <div className="flex items-center gap-4 text-base-content/70">
    //               <div className="flex items-center gap-1">
    //                 <Clock className="w-4 h-4" />
    //                 <span>{avgTime.toFixed(3)} s</span>
    //               </div>
    //               <div className="flex items-center gap-1">
    //                 <Memory className="w-4 h-4" />
    //                 <span>{avgMemory.toFixed(0)} KB</span>
    //               </div>
    //               <div className="flex items-center gap-1">
    //                 <Calendar className="w-4 h-4" />
    //                 <span>
    //                   {new Date(submission.createdAt).toLocaleDateString()}
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <div className="space-y-5">
  {sortedSubmissions.map((submission) => {
    const avgMemory = calculateAverageMemory(submission.memory);
    const avgTime = calculateAverageTime(submission.time);

    return (
      <div
        key={submission.id}
        className="bg-base-100 border border-base-300 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              {submission.status === "ACCEPTED" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Accepted
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                  <XCircle className="w-4 h-4" />
                  {submission.status}
                </span>
              )}
            </div>
            <div className="px-2 py-1 text-xs font-medium bg-base-200 text-base-content rounded-md border border-base-300">
              {submission.language}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-4 text-sm text-base-content/70">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{avgTime.toFixed(3)} s</span>
            </div>
            <div className="flex items-center gap-1">
              <Memory className="w-4 h-4" />
              <span>{avgMemory.toFixed(0)} KB</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(submission.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

  );
};

export default SubmissionsList;
