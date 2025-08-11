"use client";

import { Container, Stack } from '@mantine/core';
import Link from 'next/link';
import { Profile } from '@/types';
import classes from './Edit.module.css';

interface EditThanksProps {
    data: Profile;
}

const EditThanks: React.FC<EditThanksProps> = ({ data }) => {
    return (
        <Container size="xl" mt="xl" p={{ base: '20px', md: 0 }}>
            <h1>Thanks!</h1>
            <Stack align="center">
                <div>
                    <h3>Your update is greatly appreciated!</h3>
                </div>
                <div>
                    <h4>
                        <Link
                            href={`/profile/${data.shortUrl}`}
                            className={classes.profileButton}
                        >
                            Return to {data.name}
                        </Link>
                    </h4>
                </div>
            </Stack>
        </Container>
    );
};

EditThanks.displayName = 'EditThanks';
export default EditThanks;
