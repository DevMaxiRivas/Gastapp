interface TitlePageSectionProps {
    title: string;
    subtitle?: string;
}

export function TitlePageSection({ title, subtitle }: TitlePageSectionProps) {
    return (
        <section className="px-4 flex flex-col">
            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-400"><b>{title}</b></h1>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </section>
    );
}