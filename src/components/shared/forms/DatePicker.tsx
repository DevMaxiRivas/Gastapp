import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

type DatePickerProps = {
    value?: Date
    onChange: (date?: Date) => void
}

export function DatePicker({
    value,
    onChange,
}: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        variant="outline"
                        data-empty={!value}
                        className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                        {value
                            ? format(value, "dd-MM-yyyy")
                            : <span>Pick a date</span>}

                        <ChevronDownIcon />
                    </Button>
                }
            />

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    defaultMonth={value}
                    onSelect={onChange}
                />
            </PopoverContent>
        </Popover>
    )
}