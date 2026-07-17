import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Receipt, History, BarChart3, Target } from "lucide-react";

const features = [
  {
    icon: Receipt,
    title: "Log in seconds",
    description:
      "Tap to add an expense, swipe to log income. Categories auto-fill based on what you bought, so tracking takes less time than paying.",
  },
  {
    icon: History,
    title: "Find any transaction",
    description:
      "Search by name, date, amount, or category. Your entire financial history is one search away — no more scrolling through bank statements.",
  },
  {
    icon: BarChart3,
    title: "See the patterns",
    description:
      "Charts reveal where your money actually goes each month. Spot the subscriptions you forgot about and the categories where you overspend.",
  },
  {
    icon: Target,
    title: "Stick to your budget",
    description:
      "Set a limit for each category. GastApp shows a progress bar as you spend, so you know before you overspend, not after.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 animate-fade-in">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Features
          </p>
          <h2 className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four tools that cover the full loop: track, review, understand,
            adjust.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2 lg:gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative border-border/50 bg-card/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5 hover:border-emerald-200/80"
            >
              <CardHeader>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-100">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-[15px] leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
