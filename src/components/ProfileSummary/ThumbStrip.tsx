"use client";

import { Image } from "@mantine/core";
import { useState } from "react";

export default function ThumbStrip({ images }: { images: string[] }) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <>
            {images.map((url, i) => (
                <Image
                    key={`${url}-${i}`}
                    src={url}
                    alt={`Thumbnail ${i + 1}`}
                    onClick={() => setSelected(url)}
                    style={{
                        cursor: "pointer",
                        borderRadius: 4,
                        margin: 10,
                        width: 100,
                        outline: selected === url ? "2px solid #000" : "none",
                    }}
                />
            ))}
        </>
    );
}
