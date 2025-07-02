import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Lightbulb, Loader, Rocket, Terminal } from "lucide-react";
import ProblemTable from "../components/ProblemTable";
import ProblemPageHeader from "../components/ProblemPageHEader";

function HomePage() {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ProblemPageHeader />
      <ProblemTable problems={problems} />
    </>
  );
}

export default HomePage;
