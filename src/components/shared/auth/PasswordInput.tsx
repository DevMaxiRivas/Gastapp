import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

type PasswordInputProps = {
    value?: string
    onChange: (value: string) => void
}

export const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={event => onChange(event.target.value)}
                placeholder="••••••••"
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}

export default PasswordInput;