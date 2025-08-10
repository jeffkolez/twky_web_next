"use client";

import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default function EditButton({ shortUrl }: { shortUrl: string }) {
    const router = useRouter();
    return (
        <FaEdit
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => router.push(`/edit-bio?shortUrl=${encodeURIComponent(shortUrl)}`)}
            aria-label="Suggest an update"
            title="Suggest an update"
        />
    );
}
