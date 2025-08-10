"use client";

import { Image } from "@mantine/core";
import { useState, useMemo } from "react";

export default function MainImageClient({ images, alt }: { images: string[]; alt: string }) {
    const initial = useMemo(() => (Array.isArray(images) && images[0]) || "", [images]);
    const [current, setCurrent] = useState(initial);

    if (current !== initial && initial && !images.includes(current)) {
        setCurrent(initial);
    }

    return <Image src={current} alt={alt} />;
}
