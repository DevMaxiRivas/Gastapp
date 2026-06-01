import {
    ShoppingBag,
    Car,
    Home,
    Utensils,
    Heart,
    Tv,
    CreditCard,
    MoreHorizontal,
    type LucideIcon
} from 'lucide-react';

export const CATEGORY_ICONS: Readonly<Record<string, LucideIcon>> = {
    'UtensilsIcon': Utensils,
    'CarIcon': Car,
    'CreditCardIcon': CreditCard,
    'TvIcon': Tv,
    'HomeIcon': Home,
    'HeartIcon': Heart,
    'ShoppingBagIcon': ShoppingBag,
    'MoreHorizontalIcon': MoreHorizontal,
};

export const COLORS_TEXT: Readonly<Record<'success' | "neutral" | 'danger', string>> = {
    'success': "text-green-600",
    'neutral': "text-blue-600",
    'danger': "text-red-600",
};

export const COLORS_BG: Readonly<Record<'success' | "neutral" | 'danger', string>> = {
    'success': "bg-green-200",
    'neutral': "bg-blue-200",
    'danger': "bg-red-200",
};
