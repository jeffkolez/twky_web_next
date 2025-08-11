"use client";

import { useState } from "react";
import { Autocomplete, ComboboxItem } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/queries";
import type { ProfileSearchResult } from "@/types";
import classes from "./SearchAuto.module.css";

export interface SearchAutoProps {
    onOptionSubmit: (value: string) => void;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchAuto({
    onOptionSubmit,
    onChange,
    onKeyDown,
}: SearchAutoProps) {
    const [searchText, setSearchText] = useState("");

    const { isLoading, data } = useQuery<ProfileSearchResult[]>({
        queryKey: ["search", { w: searchText }],
        queryFn: () => search({ queryKey: ["search", { w: searchText }] }),
        enabled: searchText.trim().length > 0,
    });

    const profilesByShortUrl: ComboboxItem[] =
        !isLoading && Array.isArray(data)
            ? data.map(({ shortUrl, name }) => ({
                  value: shortUrl,
                  label: name,
              }))
            : [];

    return (
        <Autocomplete
            style={{ width: "80%" }}
            className={classes.auto}
            data={profilesByShortUrl}
            maxDropdownHeight={300}
            placeholder="Search for a profile"
            onChange={(value) => {
                setSearchText(value);
                onChange(value);
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onKeyDown(e);
                }
            }}
            onOptionSubmit={onOptionSubmit}
        />
    );
}
