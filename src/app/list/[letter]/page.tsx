import type { Metadata } from "next";
import { Space } from '@mantine/core';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ListProfiles from '@/components/Profiles/ListProfiles';
import { getAll } from '@/queries';
import IndexList from '@/components/Profiles/IndexList';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ letter: string }>;
}): Promise<Metadata> {
    const { letter } = await params;
    return {
        title: `Serial Killers that start with ${letter} | They Will Kill You`,
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ letter: string }>;
}) {
    const { letter } = await params;
    const data = await getAll(letter);

    return (
        <>
            <Header />
            <IndexList />
            <ListProfiles isLoading={false} data={data} />
            <IndexList />
            <Space h="xl" />
            <Footer />
        </>
    );
}


