const steps = [
  {
    number: "01",
    title: "Sign up",
    description:
      "Enter your email. No credit card, no bank linking, no friction. You're in in 30 seconds.",
  },
  {
    number: "02",
    title: "Log your first transaction",
    description:
      "Add what you spent or earned. GastApp learns your categories as you go, so it gets faster every time.",
  },
  {
    number: "03",
    title: "Understand your cash flow",
    description:
      "After a week, you'll see patterns you never noticed. After a month, you'll know exactly where to cut back.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            How it works
          </p>
          <h2 className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">
            Three steps to clarity
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No spreadsheets. No manuals. Just answers about your money.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-7 left-[60%] hidden h-px w-[80%] bg-border sm:block" />
              )}

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                <span className="text-xl">{step.number}</span>
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
