import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InputSelectProps {
    id: string;
    placeholder: string;
    items: Array<{ label: string, value: string }>;
    name: string;
    disabled?: boolean;
    invalid: boolean;
    value: string;
    onChange: (...event: any[]) => void;
}


export default function InputSelect({ id, placeholder, items, name, value, onChange, invalid, disabled }: InputSelectProps) {
    return (
        <Select
            items={items}
            name={name}
            value={value}
            onValueChange={onChange}
            disabled={disabled ?? false}
        >
            <SelectTrigger
                id={id}
                aria-invalid={invalid}
                className="w-full"
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="">
                    {placeholder}
                </SelectItem>
                {items.map((option: { label: string, value: string }) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}