import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import type { TransactionType } from "@/types/TransactionType"
import { COLORS_BG, COLORS_TEXT } from "@/lib/constantsFront";

export function TransactionItem({ transaction }: { transaction: TransactionType }) {
    const colorType = transaction.type === "EXPENSE" ? "danger" : "success";
    return (
        <Item>
            <ItemMedia>
                <div className={`flex items-center justify-center rounded-md size-10 ${COLORS_BG[colorType]}`}>
                    <transaction.category.icon className={`m-auto ${COLORS_TEXT[colorType]}`} />
                </div>
            </ItemMedia>
            <ItemContent className="gap-1">
                <div className="flex items-center justify-between">
                    <div>
                        <ItemTitle>{transaction.category.name} - {transaction.date.toLocaleDateString()}</ItemTitle>
                        <ItemDescription>{transaction.note}</ItemDescription>
                    </div>
                    <span className={`${COLORS_TEXT[colorType]}`}>ARS {transaction.amount}</span>
                </div>
            </ItemContent>

        </Item>
    )
}
