"use client";

import { Container, Flex, Stack, Textarea, Text, Button, Image, Skeleton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Profile } from '@/types';
import classes from './Edit.module.css';

interface EditProps {
    data?: Profile;
}

const EditProfile: React.FC<EditProps> = ({ data }) => {
    const router = useRouter();
    const shortUrl = data?.shortUrl;
    const [comment, setComment] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestBody = {
            comment,
            shortUrl,
        };

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_URL}/profile/suggest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                router.push(`/edit-bio-thanks?id=${shortUrl}`);
            } else {
                // Optional: surface an error state for the user here
                console.error('Failed to submit comment', await response.text());
            }
        } catch (error) {
            console.error('Error submitting the comment:', error);
        }
    };

    return (
        <Container size="xl" mt="xl" p={{ base: '20px', md: 0 }}>
            <form onSubmit={handleSubmit}>
                <h1>Suggest an update for {data?.name}</h1>

                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align={{ base: 'center', md: 'flex-start' }}
                    gap="md"
                >
                    <Stack align="center" style={{ flex: '0 0 20%' }}>
                        {data?.media?.[0] ? (
                            <Image
                                src={data.media[0]}
                                alt={data.name}
                                style={{
                                    margin: 0,
                                    maxHeight: '200px',
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            <Skeleton h="200px" w="200px" />
                        )}
                        <Text style={{ textAlign: 'center' }}>
                            <strong>{data?.name}</strong>
                        </Text>
                    </Stack>

                    <Stack style={{ flex: 1, width: '100%' }}>
                        <Textarea
                            placeholder="Suggest an update"
                            onChange={(e) => setComment(e.currentTarget.value)}
                            minRows={10}
                            autosize
                            required
                            style={{ width: '100%' }}
                        />

                        <Button
                            type="submit"
                            mt="md"
                            variant="default"
                            w="100%"
                            className={classes.profileButton}
                        >
                            Submit Update
                        </Button>
                    </Stack>
                </Flex>
            </form>
        </Container>
    );
};

EditProfile.displayName = 'EditProfile';
export default EditProfile;
