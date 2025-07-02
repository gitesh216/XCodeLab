import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Home,
  ChevronRight,
  Bookmark,
  Share2,
  FileText,
  Code2,
  MessageSquare,
  Lightbulb,
  Terminal,
  Play,
  Settings,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Split,
  Maximize2,
  RotateCcw,
  Zap,
  Upload,
  User,
} from "lucide-react";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionsList";

import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang";

const ProblemPage2 = () => {
  const { problemId } = useParams();

  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestcases] = useState([]);
  const [runCodeTestcases, setRunCodeTestcases] = useState([]);

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const {
    executeCode,
    submission,
    isExecuting,
    executeRunCode,
    runCodeResult,
    setRunCodeResult,
    setSubmissionResult,
  } = useExecutionStore();

  useEffect(() => {
    getProblemById(problemId);
    getSubmissionCountForProblem(problemId);
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippet?.[selectedLanguage.toUpperCase()] || "");
      setTestcases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
      setRunCodeTestcases(
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

  useEffect(() => {
    setRunCodeResult(null); // clear previous run output if code is modified
  }, [code]);

  useEffect(() => {
    if (!problem) return; 
    const saved = localStorage.getItem(`preferredLanguage-${problem.id}`);
    if (saved) setSelectedLanguage(saved);
  }, [problem]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippet?.[lang] || "");
    localStorage.setItem(`preferredLanguage-${problem.id}`, lang);
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = runCodeTestcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases
        .slice(0, 3)
        .map((tc) => tc.output);
      executeRunCode(code, language_id, stdin, expected_outputs, problemId);
      setSubmissionResult(null);
    } catch (error) {
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
    } catch (error) {
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
          <div className="space-y-6">
            {/* Problem Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className=" text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {problem.title}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      problem.difficulty === "EASY"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : problem.difficulty === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                  {/* Total Submissions */}
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-xs font-medium">
                    <User className="w-4 h-4" />
                    {submissionCount} Submissions
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Bookmark
                    className="w-5 h-5"
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Problem Description */}
            <div className="prose max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {problem.description}
              </p>
            </div>

            {/* Examples */}
            {problem.examples && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Examples
                </h3>
                {Object.entries(problem.examples).map(
                  ([lang, example], index) => (
                    <div
                      key={lang}
                      className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="font-semibold text-gray-900 dark:text-white mb-3">
                        Example {index + 1}:
                      </div>
                      <div className="space-y-2 font-mono text-sm">
                        <div>
                          <span className="font-semibold">Input:</span>
                          <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900/50 rounded">
                            {example.input}
                          </pre>
                        </div>
                        <div>
                          <span className="font-semibold">Output:</span>
                          <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900/50 rounded">
                            {example.output}
                          </pre>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="font-semibold">Explanation:</span>
                            <p className="mt-1 text-gray-700 dark:text-gray-300 font-sans">
                              {example.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Constraints */}
            {problem.constraints && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Constraints
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                    {problem.constraints}
                  </pre>
                </div>
              </div>
            )}
          </div>
        );

      case "editorial":
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Editorial Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The editorial for this problem will be available after you solve
              it.
            </p>
          </div>
        );

      case "solutions":
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Code2 className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Community Solutions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Solve the problem to unlock community solutions.
            </p>
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-2 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* Breadcrumb + Title */}
          <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
            <Link
              to="/"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Problems
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
              {problem.title}
            </span>
          </div>

          {/* Language Selector + Settings */}
          <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
            <select
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-evenly w-full min-h-screen">
        {/* Left Panel - Problem Description */}
        <div className="w-full border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Tabs */}
          <div className="flex w-full border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            {[
              { key: "description", label: "Description", icon: FileText },
              { key: "editorial", label: "Editorial", icon: Lightbulb },
              { key: "solutions", label: "Solutions", icon: Code2 },
              { key: "submissions", label: "Submissions", icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-blue-500 text-blue-600 bg-white dark:bg-gray-900"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">{renderTabContent()}</div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-full flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-3 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Code
              </span>
            </div>
          </div>

          {/* Code Editor */}
          <div className="rounded-2xl bg-base-100 shadow border border-base-300">
            <div className="w-full lg:w-1/2 h-[600px]">
              <Editor
                height="100%"
                width="200%"
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* Editor Footer */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                disabled={isExecuting}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
              >
                {isExecuting ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Run
              </button>
            </div>
            <button
              onClick={handleSubmitCode}
              disabled={isExecuting}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
            >
              {isExecuting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Test Cases */}
      {/* <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Test Cases
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>3 passed</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testcases.map((testCase, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Test Case {index + 1}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">
                      Input:
                    </div>
                    <pre className="bg-white dark:bg-gray-900 p-2 rounded border font-mono">
                      {testCase.input}
                    </pre>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1">
                      Expected:
                    </div>
                    <pre className="bg-white dark:bg-gray-900 p-2 rounded border font-mono">
                      {testCase.output}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Test Case Section */}
      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          {submission ? (
            <Submission submission={submission} />
          ) : runCodeResult ? (
            <>
              <h3 className="text-xl font-bold mb-4">Run Test Results</h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>User Output</th>
                      <th>Expected Output</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {runCodeResult.testCases.map((res, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-pre-wrap font-mono text-sm">
                          {res.input}
                        </td>
                        <td className="whitespace-pre-wrap font-mono text-sm">
                          {res.stdout}
                        </td>
                        <td className="whitespace-pre-wrap font-mono text-sm">
                          {res.expected}
                        </td>
                        <td>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-md ${
                              res.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-4">Test Cases</h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>Expected Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testcases.map((test, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-pre-wrap font-mono text-sm">
                          {test.input}
                        </td>
                        <td className="whitespace-pre-wrap font-mono text-sm">
                          {test.output}
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
  );
};

export default ProblemPage2;
