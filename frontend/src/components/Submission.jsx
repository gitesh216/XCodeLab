import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  // Calculate averages
  const avgMemory =
    memoryArr
      .map((m) => parseFloat(m)) // remove ' KB' using parseFloat
      .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr
      .map((t) => parseFloat(t)) // remove ' s' using parseFloat
      .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    // <div className="space-y-6">
    //   {/* Overall Status */}
    //   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    //     <div className="card bg-base-200 shadow-lg">
    //       <div className="card-body p-4">
    //         <h3 className="card-title text-sm">Status</h3>
    //         <div
    //           className={`text-lg font-bold ${
    //             submission.status === "ACCEPTED" ? "text-success" : "text-error"
    //           }`}
    //         >
    //           {submission.status}
    //         </div>
    //       </div>
    //     </div>

    //     <div className="card bg-base-200 shadow-lg">
    //       <div className="card-body p-4">
    //         <h3 className="card-title text-sm">Success Rate</h3>
    //         <div className="text-lg font-bold">{successRate.toFixed(1)}%</div>
    //       </div>
    //     </div>

    //     <div className="card bg-base-200 shadow-lg">
    //       <div className="card-body p-4">
    //         <h3 className="card-title text-sm flex items-center gap-2">
    //           <Clock className="w-4 h-4" />
    //           Avg. Runtime
    //         </h3>
    //         <div className="text-lg font-bold">{avgTime.toFixed(3)} s</div>
    //       </div>
    //     </div>

    //     <div className="card bg-base-200 shadow-lg">
    //       <div className="card-body p-4">
    //         <h3 className="card-title text-sm flex items-center gap-2">
    //           <Memory className="w-4 h-4" />
    //           Avg. Memory
    //         </h3>
    //         <div className="text-lg font-bold">{avgMemory.toFixed(0)} KB</div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Test Cases Results */}
    //   <div className="card bg-base-100 shadow-xl">
    //     <div className="card-body">
    //       <h2 className="card-title mb-4">Test Cases Results</h2>
    //       <div className="overflow-x-auto">
    //         <table className="table table-zebra w-full">
    //           <thead>
    //             <tr>
    //               <th>Status</th>
    //               <th>Expected Output</th>
    //               <th>Your Output</th>
    //               <th>Memory</th>
    //               <th>Time</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {submission.testCases.map((testCase) => (
    //               <tr key={testCase.id}>
    //                 <td>
    //                   {testCase.passed ? (
    //                     <div className="flex items-center gap-2 text-success">
    //                       <CheckCircle2 className="w-5 h-5" />
    //                       Passed
    //                     </div>
    //                   ) : (
    //                     <div className="flex items-center gap-2 text-error">
    //                       <XCircle className="w-5 h-5" />
    //                       Failed
    //                     </div>
    //                   )}
    //                 </td>
    //                 <td className="font-mono">{testCase.expected}</td>
    //                 <td className="font-mono">{testCase.stdout || "null"}</td>
    //                 <td>{testCase.memory}</td>
    //                 <td>{testCase.time}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="space-y-8">
  {/* Overview Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="rounded-xl bg-base-100 border border-base-300 shadow-sm p-4">
      <div className="text-sm text-base-content/70 mb-1">Submission Status</div>
      <div className={`text-lg font-semibold ${
        submission.status === "ACCEPTED"
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`}>
        {submission.status}
      </div>
    </div>

    <div className="rounded-xl bg-base-100 border border-base-300 shadow-sm p-4">
      <div className="text-sm text-base-content/70 mb-1">Success Rate</div>
      <div className="text-lg font-semibold text-base-content">
        {successRate.toFixed(1)}%
      </div>
    </div>

    <div className="rounded-xl bg-base-100 border border-base-300 shadow-sm p-4">
      <div className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
        <Clock className="w-4 h-4" />
        Avg. Runtime
      </div>
      <div className="text-lg font-semibold text-base-content">
        {avgTime.toFixed(3)} s
      </div>
    </div>

    <div className="rounded-xl bg-base-100 border border-base-300 shadow-sm p-4">
      <div className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
        <Memory className="w-4 h-4" />
        Avg. Memory
      </div>
      <div className="text-lg font-semibold text-base-content">
        {avgMemory.toFixed(0)} KB
      </div>
    </div>
  </div>

  {/* Test Case Results */}
  <div className="bg-base-100 rounded-xl border border-base-300 shadow-md overflow-hidden">
    <div className="p-4 border-b border-base-300">
      <h3 className="text-lg font-semibold">Test Case Results</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="table table-zebra text-sm">
        <thead className="bg-base-200 text-base-content/70 uppercase tracking-wider text-xs">
          <tr>
            <th>Status</th>
            <th>Expected Output</th>
            <th>Your Output</th>
            <th>Memory</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {submission.testCases.map((testCase) => (
            <tr key={testCase.id}>
              <td>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    testCase.passed
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {testCase.passed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Passed
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Failed
                    </>
                  )}
                </span>
              </td>
              <td className="font-mono whitespace-pre-wrap">{testCase.expected}</td>
              <td className="font-mono whitespace-pre-wrap">{testCase.stdout || "null"}</td>
              <td>{testCase.memory} KB</td>
              <td>{testCase.time} s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default SubmissionResults;
