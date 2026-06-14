import { ToggleGroupItem } from "@/components/ui/toggle-group"
import { ToggleGroup } from "@base-ui/react"

export type OptionToggleType = {
    value: string
    label: string
}

type SimpleToggleGroupProps = {
    value: string
    onChange: (value?: string) => void
    options: OptionToggleType[]
}
export default function SimpleToggleGroup({ value, onChange, options }: SimpleToggleGroupProps) {
    return <ToggleGroup
        variant="outline"
        type="single"
        value={value}
        onValueChange={(e: string[]) => { if (e && e.length > 0) onChange(e.pop()) }}
        className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
    >
        {
            options.map((option: OptionToggleType) => (
                <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className={"cursor-pointer"}
                >
                    {option.label}
                </ToggleGroupItem>
            ))
        }
    </ToggleGroup>
}