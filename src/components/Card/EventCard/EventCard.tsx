import {Box, Text} from '@mantine/core';
import Link from 'next/link';
import classes from './EventCard.module.css';
import { ProfileCard } from '@/types';

export default ({ data }: { data: ProfileCard }) => (
    <Link className={classes.link} href={`/profile/${data.shortUrl ?? data.id}`} style={{ textDecoration: 'none' }}>
        <Box className={classes.container}>
            <img 
                src={data.media[0]}
                alt={data.name}
                style={{
                    objectFit: 'cover',
                    width: '292px',
                    height: '220px',
                    borderRadius: '12px'
                }}
            />
            <Box>
                <Text className={classes.name}>{data.name}</Text>
                {data.date_description && data.year && (
                    <Text className={classes.date}>{data.date_description} - {data.year}</Text>
                )}
            </Box>
        </Box>
    </Link>
);
