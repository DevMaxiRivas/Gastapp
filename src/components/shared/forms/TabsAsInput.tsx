import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { LucideIcon } from "lucide-react"

export type OptionTabsAsInput = {
    label: string
    value: string
    icon: LucideIcon
}

type TabsAsInputProps = {
    options: OptionTabsAsInput[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

export function TabsAsInput({
    options,
    value,
    onChange,
    disabled = false,
}: TabsAsInputProps) {
    return (
        <Tabs
            value={value}
            onValueChange={onChange}
        >
            <TabsList className={`grid w-full ${options.length > 2 ? 'grid-cols-' + options.length : 'grid-cols-2'}`}>
                {options.map((option) => (
                    <TabsTrigger key={option.value} value={option.value} disabled={disabled}>
                        <option.icon />
                        {option.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}