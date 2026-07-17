import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Free for personal use",
  "No bank linking needed",
  "Export your data anytime",
];

export function CTASection() {
  return (
    <section className="py-24 sm:py-32 animate-fade-in-up">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-16 sm:px-12 sm:py-20">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-white/5 blur-xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
              Start seeing where your money goes
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Join thousands of people who stopped guessing and started
              understanding their finances. Set up takes less than a minute.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to={APP_ROUTES.REGISTER}>
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-white text-emerald-700 hover:bg-white/90 shadow-lg"
                >
                  Create your free account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-1.5 text-sm text-emerald-100"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
