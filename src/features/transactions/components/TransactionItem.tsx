import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { useAuth } from "@/context/AuthContext";
import { TransactionTypeObject } from "@/enums/transaction/TransactionType";
import { CATEGORY_ICONS, COLORS_BG, COLORS_TEXT } from "@/lib/constantsFront";
import type { Transaction } from "@/types/backend/transaction/response";
import { capitalizeFirstLetter } from "@/utils/stringUtils";
import { format, parse } from "date-fns";
import type { LucideIcon } from "lucide-react";

export function TransactionItem({ transaction }: { transaction: Transaction }) {
    const { user } = useAuth();

    const IconCategory: LucideIcon = CATEGORY_ICONS[transaction.category.icon];

    const isExpense: boolean = transaction.type === TransactionTypeObject.EXPENSE;

    const colorType: "danger" | "success" = isExpense ? "danger" : "success";

    const date: string = format(parse(transaction.transactionDate, "yyyy-MM-dd", new Date()), 'd MMMM');

    return (
        <Item>
            <ItemMedia>
                <div className={`flex items-center justify-center rounded-md size-10 ${COLORS_BG[colorType]}`}>
                    {IconCategory && (
                        <IconCategory className={`m-auto size-5 ${COLORS_TEXT[colorType]}`} />
                    )}
                </div>
            </ItemMedia>
            <ItemContent className="gap-1">
                <div className="flex flex-col sm:flex-row w-full justify-between">
                    <div>
                        <ItemTitle>{capitalizeFirstLetter(transaction.category.name)} - {date}</ItemTitle>
                        <ItemDescription className="hidden md:block">
                            {transaction.note ? transaction.note.substring(0, 40) : "-"}
                        </ItemDescription>
                    </div>
                    <span className={`${COLORS_TEXT[colorType]}`}>
                        {user?.profile?.currency} {(isExpense ? -transaction.amount : transaction.amount).toLocaleString()}
                    </span>
                </div>
            </ItemContent>

        </Item>
    )
}
