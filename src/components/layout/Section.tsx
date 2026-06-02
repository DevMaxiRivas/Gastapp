import { type ReactNode } from "react"

export function Section({ children }: { children: ReactNode }) {
    return (
        <section className="px-4">
            {children}
        </section>
    )
}