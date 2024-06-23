'use client';

type ListItemSkeletonProps = {
    title: string;
    description?: string;
}

export default function ListItemSkeleton({title, description}: ListItemSkeletonProps) {
    return (
        <li className={'p-10 border-b-cyan-100 border-solid'}>
            <div className={`bg-#eee h-20 mb-10 w-0.5`}>{title}</div>
            <div className={`bg-#eee h-20 mb-10 w-full`}>{description}</div>
        </li>
    )
}