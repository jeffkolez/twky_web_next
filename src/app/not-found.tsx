'use client';

import { Space, Container, Text, Title } from '@mantine/core';
import Header from '@/components/Header/Header';
import Featured from '@/components/Featured/Featured';
import Footer from '@/components/Footer/Footer';
import IndexList from '@/components/Profiles/IndexList';

export default function NotFound() {
    return (
        <>
        <Header />
        <Container>
            <Space h="xl" />
            <Title order={1}>404 – Not Found</Title>
            <Space h="md" />
            <Text>It seems like the page you&apos;re looking for has disappeared into the shadows...</Text>
            <Space h="md" />
            <IndexList />
            <Space h="xl" />
        </Container>
        <Featured title="Featured Murderers" shortUrl="highlights" />
        <Space h="xl" />
        <Footer />
        </>
    );
}
