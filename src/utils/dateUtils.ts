export function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
}

export function getMonthName(date: Date) {
    return date.toLocaleString('default', { month: 'long' })
}

export function validateDateIsBeforeToday(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
}

export function validateDateIsAfterToday(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date > today;
}

export function validateDateIsSameDay(date: Date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}