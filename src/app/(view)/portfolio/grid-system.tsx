import React from 'react'

export default function GridSystem({ items }: {
    items: {
        title: string;
        description: string;
        image: string;
        href: string;
    }[]
}) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
            {items.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <div key={index} className="border rounded p-4">
                    <img src={item.image} alt={item.title} className="w-full h-auto" />
                    <h3 className="text-lg font-bold pt-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Visit
                    </a>
                </div>
            ))}
        </section>
    )
}
