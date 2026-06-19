import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PageSizeSelectProps {
    currentPageSize: number;
    setPageSize: (e: number) => void;
    options: number[]
}

export default function PageSizeSelect({ currentPageSize, setPageSize, options }: PageSizeSelectProps) {
    return (
        <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="recent-customers-rows-per-page" className="font-medium text-sm">
                Rows per page
            </Label>
            <Select
                value={currentPageSize}
                onValueChange={(e) => setPageSize(Number(e))}
            >
                <SelectTrigger size="sm" className="w-20" id="recent-customers-rows-per-page">
                    <SelectValue placeholder={currentPageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                    <SelectGroup>
                        {options.map((size) => (
                            <SelectItem key={size} value={`${size}`}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}