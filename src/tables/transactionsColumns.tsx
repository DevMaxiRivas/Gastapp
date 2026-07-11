import type { Transaction } from '@/types/backend/transaction/response';
import { getColorByTransactionType, type TypeTransactionType } from '@/enums/transaction/TransactionType';
import { type ColumnDef } from '@tanstack/react-table';
import { CATEGORY_ICONS, COLORS_TEXT, TYPE_TRANSACTION_ICONS } from '@/lib/constantsFront';
import { CreditCard, HomeIcon, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ReactNode } from 'react';
import { capitalizeFirstLetter } from '@/utils/stringUtils';
import type { Category } from '@/types/backend/category/response';
import { format, parseISO } from 'date-fns';
import type { ColorType } from '@/types/colors/types';
import { roundTo } from '@/utils/numberUtils';
import { Button } from '@/components/ui/button';
import { EditTransacionDialog } from '@/features/transactions/components/EditTransacionDialog';

function getColorTxt(type: TypeTransactionType): string {
  const color: ColorType = getColorByTransactionType(type);
  return COLORS_TEXT[color] ?? "text-black";
}

function CategoryBadge(categrory: Category): ReactNode {
  const Icon: LucideIcon = CATEGORY_ICONS[categrory.icon] ?? HomeIcon;
  return <Badge variant="outline" className={`px-1.5 text-muted-foreground`}>
    <Icon className={`me-2 ${getColorTxt(categrory.type)}`} />
    {capitalizeFirstLetter(categrory.name)}
  </Badge>
}

function TypeBadge(type: TypeTransactionType): ReactNode {
  const Icon: LucideIcon = TYPE_TRANSACTION_ICONS[type] ?? CreditCard;
  return <Badge variant="outline" className={`px-1.5 text-muted-foreground`}>
    <Icon className={`me-2 ${getColorTxt(type)}`} />
    {type}
  </Badge>
}

const transactionsColumns: ColumnDef<Transaction>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (info) => <p>
      $ {`${roundTo(info.getValue<number>(), 2).toLocaleString()}`}
    </p>,
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
    cell: (info) => CategoryBadge(info.row.original.category),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    filterFn: 'equals',
    cell: (info) => TypeBadge(info.getValue<TypeTransactionType>()),
  },

  {
    accessorKey: 'note',
    header: 'Note',
    filterFn: 'equals',
    cell: (info) => info.getValue<string>().length ? `${info.getValue<string>().slice(0, 50)}${info.row.original.note.length > 50 ? "..." : ""}` : "No note has been recorded.",
  },
  {
    accessorKey: 'transactionDate',
    header: 'Date',
    cell: (info) => format(parseISO(info.getValue<string>()), 'PPP'),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <EditTransacionDialog transaction={row.original} />

          <Button onClick={() => console.log("Delete")} className={"bg-transparent border-red-600 text-red-600 hover:bg-red-600 hover:text-background"}>
            Delete
          </Button>
        </div>
      );
    },
  }
];

export default transactionsColumns;
