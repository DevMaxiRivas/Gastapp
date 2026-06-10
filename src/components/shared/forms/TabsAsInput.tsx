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
};

export function TabsAsInput({
    options,
    value,
    onChange,
}: TabsAsInputProps) {
    return (
        <Tabs
            value={value}
            onValueChange={onChange}
        >
            <TabsList className={`grid w-full ${options.length > 2 ? 'grid-cols-' + options.length : 'grid-cols-2'}`}>
                {options.map((option) => (
                    <TabsTrigger key={option.value} value={option.value}>
                        <option.icon />
                        {option.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}