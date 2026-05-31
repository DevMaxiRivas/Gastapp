import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type Item = {
    label: string
    value: string | number | null
}

type GroupItems = {
    label: string
    items: Item[]
}

type ScrollableGroupSelectProps = {
    label: string
    groups: GroupItems[]
}

function createListItems(label: string, groups: GroupItems[]) {
    let items: Item[] = [
        { label: `Select a ${label}`, value: null }
    ]
    groups.forEach((group) => {
        items = [...items, ...group.items];
    });

    return items
}

export function ScrollableGroupSelect({ label, groups }: ScrollableGroupSelectProps) {
    const items = createListItems(label, groups)
    return (
        <Select items={items}>
            <SelectTrigger className="w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {groups.map((group) => (
                    <SelectGroup>
                        <SelectLabel>{group.label}</SelectLabel>
                        {group.items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    );
}