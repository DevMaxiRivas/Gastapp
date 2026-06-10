import { Spinner } from "@/components/ui/spinner";

export default function LoadingSpinnerForm() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                gap: "0.75rem",
                color: "var(--color-text-secondary)",
                fontSize: "0.875rem",
            }}
        >
            <span
                style={{
                    width: 18,
                    height: 18,
                    border: "2px solid currentColor",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                }}
            />
            Loading...
            <Spinner />
        </div>
    );
}