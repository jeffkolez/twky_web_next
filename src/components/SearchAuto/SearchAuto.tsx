import { Autocomplete, ComboboxItem } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { search } from '@/queries';

import classes from './SearchAuto.module.css';

export default ({ onOptionSubmit, onChange, onKeyDown }: { onOptionSubmit: any, onChange: any, onKeyDown: any }) => {
    const [searchText, setSearchText] = useState('');
    const { isLoading, data } = useQuery({
        queryKey: [`search-${searchText}`, { w: searchText }],
        queryFn: search
    });

    let profilesByShortUrl: Array<ComboboxItem> = [];

    if (!isLoading && data) {
        profilesByShortUrl = data.map(({ shortUrl, name }: { shortUrl: string, name: string }) => ({ value: shortUrl, label: name }));
    }

    return (
        <Autocomplete
            style={{ width: '80%' }}
            className={classes.auto}
            data={profilesByShortUrl}
            maxDropdownHeight={300}
            placeholder="Search for a profile"
            onChange={(value: string) => {
                setSearchText(value);
                onChange(value);
            }}
            onKeyDown={e => {
                    if (e.key === 'Enter') {
                        onKeyDown();
                    }
                }
            }
            onOptionSubmit={onOptionSubmit}
        />
    );
};
