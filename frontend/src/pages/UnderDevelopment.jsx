import { Wrench, ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnderDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-200 to-base-300 text-center px-6">
      {/* Logo or platform name */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">
        This Page is Under Development
      </h1>

      {/* Icon and message */}
      <div className="flex flex-col items-center mt-4 mb-8">
        <Wrench className="w-16 h-16 text-yellow-500 animate-pulse" />
        <p className="mt-4 text-base sm:text-lg text-base-content/80 max-w-xl">
          We are working hard to bring this feature to life. Stay tuned while we build something awesome for you!
        </p>
      </div>

      {/* CTA or Go Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition font-medium"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Go Back Home
      </Link>

      {/* Footer Note */}
      <div className="mt-10 text-xs text-base-content/60">
        &copy; {new Date().getFullYear()} XCodeLab. All rights reserved.
      </div>
    </div>
  );
}
