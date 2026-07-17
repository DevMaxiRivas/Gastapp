import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-emerald-100/50 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div className="max-w-xl animate-fade-in-down">
            <h1 className="text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Where did your money go?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              GastApp tracks every dollar so you can see exactly where it went,
              where it&apos;s going, and how to keep more of it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={APP_ROUTES.REGISTER}>
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                >
                  Start tracking free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              No credit card required. Set up in 30 seconds.
            </p>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="animate-slide-in-right">
            <div className="relative rounded-2xl border border-border/60 bg-card p-1.5 shadow-2xl shadow-emerald-900/8 sm:p-3">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border/40 px-3 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/15" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-muted/60 px-3 py-1 text-[11px] text-muted-foreground">
                  app.gastapp.com/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4 sm:p-6">
                {/* Top row: Balance */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Total Balance
                    </p>
                    <p className="mt-1 text-3xl tracking-tight text-foreground sm:text-4xl">
                      $12,458
                    </p>
                    <p className="mt-1 text-xs font-medium text-emerald-600">
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                    Live
                  </div>
                </div>

                {/* Middle row: Income / Expenses */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                    <p className="text-[11px] font-medium text-muted-foreground">
                      Income this month
                    </p>
                    <p className="mt-1 text-xl text-emerald-600">
                      $5,240
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                    <p className="text-[11px] font-medium text-muted-foreground">
                      Spent this month
                    </p>
                    <p className="mt-1 text-xl text-foreground">
                      $3,060
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="mt-5 rounded-xl border border-border/50 bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-muted-foreground">
                      Cash flow
                    </p>
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Income
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/20" />
                        Expense
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-end gap-1.5 h-24">
                    {[35, 50, 40, 60, 45, 70, 55, 65, 50, 75, 60, 80].map(
                      (h, i) => (
                        <div key={i} className="flex flex-1 flex-col gap-0.5">
                          <div
                            className="rounded-sm bg-emerald-500/70 transition-all duration-300 hover:bg-emerald-500"
                            style={{ height: `${h * 0.55}%` }}
                          />
                          <div
                            className="rounded-sm bg-foreground/10 transition-all duration-300 hover:bg-foreground/20"
                            style={{ height: `${h * 0.35}%` }}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] text-muted-foreground/60">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="mt-5">
                  <p className="text-[11px] font-medium text-muted-foreground mb-2">
                    Recent
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: "Spotify", amount: "-$10.99", cat: "Subscription" },
                      { name: "Salary deposit", amount: "+$2,620", cat: "Income" },
                      { name: "Whole Foods", amount: "-$84.32", cat: "Groceries" },
                    ].map((tx) => (
                      <div
                        key={tx.name}
                        className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3 py-2"
                      >
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {tx.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {tx.cat}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-semibold ${tx.amount.startsWith("+")
                            ? "text-emerald-600"
                            : "text-foreground"
                            }`}
                        >
                          {tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
