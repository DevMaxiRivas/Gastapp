import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Freelance Designer",
    quote:
      "I used to lose track of invoices and expenses across three apps. GastApp replaced all of them. I found $400 in subscriptions I'd forgotten about in the first week.",
    avatar: "SM",
  },
  {
    name: "David K.",
    role: "Small Business Owner",
    quote:
      "My accountant asked me how I was tracking everything so neatly. I told her about GastApp and she started recommending it to her other clients.",
    avatar: "DK",
  },
  {
    name: "Maria L.",
    role: "College Student",
    quote:
      "I used to check my bank balance and panic. Now I see exactly what's left after bills, groceries, and rent. No more guessing.",
    avatar: "ML",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            What people say
          </p>
          <h2 className="mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">
            Real users, real clarity
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-border/50 bg-card/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <CardContent className="pt-6">
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
