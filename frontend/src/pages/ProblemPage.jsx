import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";


import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionsList";

import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang";

function ProblemPage() {
  const { problemId } = useParams();

  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestcases] = useState([]);

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const { executeCode, submission, isExecuting, executeRunCode } = useExecutionStore();

  useEffect(() => {
    getProblemById(problemId);
    getSubmissionCountForProblem(problemId);
  }, [problemId]);


  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippet?.[selectedLanguage.toUpperCase()] || "");
      setTestcases(
        problem.testcases?.slice(0, 3).map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && problemId) {
      getSubmissionForProblem(problemId);
    }
  }, [activeTab, problemId]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippet?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.slice(0, 3).map((tc) => tc.input);
      const expected_outputs = problem.testcases.slice(0, 3).map((tc) => tc.output);
      executeRunCode(code, language_id, stdin, expected_outputs, problemId);
    } 
    catch (error) {
      console.log("Error executing run code", error);
    }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, problemId);
    } 
    catch (error) {
      console.log("Error executing submit code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

const renderTabContent = () => {
  switch (activeTab) {
    case "description":
      return (
        <div className="prose max-w-none space-y-8">
          {/* Problem Description */}
          <div className="text-base-content text-lg leading-relaxed">
            {problem.description}
          </div>

          {/* Examples */}
          {problem.examples && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-primary">Examples</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(problem.examples).map(([lang, example]) => (
                  <div
                    key={lang}
                    className="rounded-xl bg-neutral p-6 shadow-md border border-base-300"
                  >
                    <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                      Language: {lang}
                    </div>

                    <div className="mb-3">
                      <div className="text-accent mb-1 font-semibold">
                        Input:
                      </div>
                      <pre className="bg-base-200 px-4 py-2 rounded-md text-sm whitespace-pre-wrap">
                        {example.input}
                      </pre>
                    </div>

                    <div className="mb-3">
                      <div className="text-accent mb-1 font-semibold">
                        Output:
                      </div>
                      <pre className="bg-base-200 px-4 py-2 rounded-md text-sm whitespace-pre-wrap">
                        {example.output}
                      </pre>
                    </div>

                    {example.explanation && (
                      <div>
                        <div className="text-success font-semibold mb-1">
                          Explanation:
                        </div>
                        <p className="text-base-content/80 text-sm leading-relaxed">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Constraints */}
          {problem.constraints && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-primary">
                Constraints
              </h3>
              <div className="bg-base-200 p-4 rounded-xl border border-base-300 text-base-content/90 text-sm font-mono">
                {problem.constraints}
              </div>
            </section>
          )}
        </div>
      );

    case "submissions":
      return (
        <div className="p-4">
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        </div>
      );

    case "hints":
      return (
        <div className="p-4">
          {problem?.hints ? (
            <div className="bg-base-200 p-6 rounded-xl border border-base-300">
              <p className="text-base-content/90 text-sm font-medium">
                {problem.hints}
              </p>
            </div>
          ) : (
            <div className="text-center text-base-content/60">
              No hints available
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};



  return (
  <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200">
    {/* Navbar */}
    <nav className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-50">
      <div className="flex-1 gap-2">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <Home className="w-6 h-6" />
          <ChevronRight className="w-4 h-4" />
        </Link>
        <div className="mt-2">
          <h1 className="text-2xl font-bold leading-tight">{problem.title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70 mt-2">
            <Clock className="w-4 h-4" />
            <span>
              Updated {new Date(problem.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-base-content/30">•</span>
            <Users className="w-4 h-4" />
            <span>{submissionCount} Submissions</span>
            <span className="text-base-content/30">•</span>
            <ThumbsUp className="w-4 h-4" />
            <span>95% Success Rate</span>
          </div>
        </div>
      </div>
      <div className="flex-none gap-4">
        <button
          className={`btn btn-ghost btn-circle ${isBookmarked ? "text-primary" : ""}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className="w-5 h-5" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <Share2 className="w-5 h-5" />
        </button>
        <select
          className="select select-bordered select-primary w-40"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {Object.keys(problem.codeSnippet || {}).map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </nav>

    {/* Main Content */}
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            <div className="tabs tabs-lg tabs-bordered px-6 pt-4">
              <button
                className={`tab gap-2 font-medium ${activeTab === "description" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                <FileText className="w-4 h-4" /> Description
              </button>
              <button
                className={`tab gap-2 font-medium ${activeTab === "submissions" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("submissions")}
              >
                <Code2 className="w-4 h-4" /> Submissions
              </button>
              <button
                className={`tab gap-2 font-medium ${activeTab === "discussion" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("discussion")}
              >
                <MessageSquare className="w-4 h-4" /> Discussion
              </button>
              <button
                className={`tab gap-2 font-medium ${activeTab === "hints" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("hints")}
              >
                <Lightbulb className="w-4 h-4" /> Hints
              </button>
            </div>
            <div className="p-6">{renderTabContent()}</div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            <div className="tabs tabs-lg tabs-bordered px-6 pt-4">
              <button className="tab tab-active gap-2 font-medium">
                <Terminal className="w-4 h-4" /> Code Editor
              </button>
            </div>

            <div className="h-[600px] w-full border-t border-base-300">
              <Editor
                height="100%"
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 18,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            <div className="p-4 border-t border-base-300 bg-base-200 flex justify-between items-center">
              <button
                className={`btn btn-primary gap-2 ${isExecuting ? "loading" : ""}`}
                onClick={handleRunCode}
                disabled={isExecuting}
              >
                {!isExecuting && <Play className="w-4 h-4" />} Run Code
              </button>
              <button 
                className={`btn btn-success gap-2 ${isExecuting ? "loading" : ""}`}
                onClick={handleSubmitCode}
                disabled={isExecuting}
              >
              {!isExecuting && <Play className="w-4 h-4" />}  Submit Solution
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Case Section */}
      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          {submission ? (
            <Submission submission={submission} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Test Cases</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>Expected Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testcases.map((testCase, index) => (
                      <tr key={index}>
                        <td className="font-mono whitespace-pre-wrap max-w-[300px]">
                          {testCase.input}
                        </td>
                        <td className="font-mono whitespace-pre-wrap max-w-[300px]">
                          {testCase.output}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);



}



export default ProblemPage;
