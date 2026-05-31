import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { useState } from "react"
import { Button } from "@/components/ui/button"

// type DatePickerProps = {
//     label: string
//     date: Date | undefined
//     setDate: (date: Date) => void
// }

export function DatePicker(
    // { label, date, setDate }: DatePickerProps
) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button
                        variant={"outline"}
                        data-empty={!date}
                        className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground">
                        {date ? format(date, 'dd-MM-yyyy') : <span>Pick a date</span>}
                        <ChevronDownIcon data-icon="inline-end" />
                    </Button>
                }
            />
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                />
            </PopoverContent>
        </Popover>
    )
}
