import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/shared/forms/DatePicker";
import { ScrollableGroupSelect } from "@/components/shared/forms/ScrollableGroupSelect";

const insuranceCategory = [
    { label: "Healt", value: 3 },
    { label: "Car", value: 4 },
]
const taxesCategory = [
    { label: "Electricity bill", value: 6 },
    { label: "Municipal Bill", value: 7 },
]

const groups = [
    { label: "Insurances", items: insuranceCategory },
    { label: "Taxes", items: taxesCategory },
]

export default function RegisterTransactionForm() {
    return (
        <form className="flex flex-col gap-4">
            <Label htmlFor="description">Description</Label>
            <Input
                id="description"
                name="description"
                type="text"
                placeholder="Enter your description"
                required />

            <Label htmlFor="total">Total</Label>
            <Input
                id="total"
                name="total"
                type="number"
                placeholder="Example: 50.99"
                required
            />

            <Label htmlFor="category">Category</Label>
            <ScrollableGroupSelect label="category" groups={groups} />

            <Label htmlFor="date">Date</Label>
            <DatePicker />

            <Button type="submit">Register</Button>
        </form>
    );
}
