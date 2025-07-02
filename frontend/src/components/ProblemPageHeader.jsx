import { Code, Trophy, Users, Search } from "lucide-react";

export default function ProblemPageHeader() {
  return (
    <section className="relative min-h-80 w-full flex flex-col items-center text-center py-16 px-4 sm:px-8 bg-gradient-to-br from-base-200 via-base-100 to-base-300 dark:from-base-300 dark:to-base-100 mt-16">
      {/* Background Blur Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/30 blur-[160px] rounded-full z-0" />

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-base-content dark:text-white leading-tight tracking-tight">
        Explore <span className="text-primary">Coding Challenges</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg font-medium text-gray-600 dark:text-gray-400">
        Improve your problem-solving skills with real interview-level
        challenges. Track your progress, solve by difficulty, and grow faster 🚀
      </p>
    </section>
  );
}
