import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { useAuth } from "@/context/AuthContext";
import { TransactionTypeObject } from "@/enums/transaction/TransactionType";
import { COLORS_BG, COLORS_TEXT } from "@/lib/constantsFront";
import type { Profile } from "@/types/backend/auth/user";
import type { Transaction } from "@/types/backend/transaction/response";

export function TransactionItem({ transaction }: { transaction: Transaction }) {
    const { user } = useAuth();
    let profile: Profile | null = null;
    if (user?.profile) {
        profile = user.profile;
    }

    const colorType = transaction.type === TransactionTypeObject.EXPENSE ? "danger" : "success";
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
                        <ItemTitle>{transaction.category.name} - {new Date(transaction.transactionDate).toLocaleDateString()}</ItemTitle>
                        <ItemDescription>{transaction.note}</ItemDescription>
                    </div>
                    <span className={`${COLORS_TEXT[colorType]}`}>{profile ? profile.currency : "USD"} {transaction.amount}</span>
                </div>
            </ItemContent>

        </Item>
    )
}
