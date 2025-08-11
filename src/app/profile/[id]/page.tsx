import type { Metadata } from 'next';
import { RouteProps } from '@/types/route';
import { getProfile } from '@/queries';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProfileSummary from '@/components/ProfileSummary/ProfileSummary';
import Related from '@/components/Featured/Related';
import ProfileContent from '@/components/ProfileContent/ProfileContent';
import { JsonLdSchema } from '@/types';
import { notFound } from 'next/navigation';
import { Space } from '@mantine/core';

export async function generateMetadata(
    props: RouteProps<{ id: string }>
): Promise<Metadata> {
    const { id } = await props.params;
    const data = await getProfile({ queryKey: ['getProfile', { id }] });

    if (!data) {
        return { title: 'Profile not found | They Will Kill You' };
    }

    return {
        title: `The Story of ${data.type} ${data.name} | They Will Kill You`,
        description: data.markup?.description || '',
    };
}

export default async function ProfileRoute(
    props: RouteProps<{ id: string }>
) {
    const { id } = await props.params;
    const data = await getProfile({ queryKey: ['getProfile', { id }] });

    if (!data) notFound();

    const jsonLd: JsonLdSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        identifier: data.shortUrl || '',
        name: data.markup?.name || '',
        alternateName: data.markup?.alternateName || null,
        nationality: {
            '@type': 'Country',
            name:
                typeof data.markup?.nationality === 'string'
                    ? data.markup.nationality
                    : 'Unknown',
        },
        description: data.markup?.description || '',
        knowsAbout: Array.isArray(data.markup?.knowsAbout)
            ? data.markup.knowsAbout
            : [],
        subjectOf: {
            '@type': 'Thing',
            name:
                typeof data.markup?.subjectOf === 'object' &&
                data.markup?.subjectOf?.name
                    ? data.markup.subjectOf.name
                    : 'Unknown',
        },
        numberOfVictims: data.markup?.numberOfVictims || 'Unknown',
        image: data.markup?.image || [],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            <ProfileSummary data={data} isLoading={false} />
            <ProfileContent data={data} />
            <Related title="Related Profiles" shortUrl={data.shortUrl || ''} />
            <Space h="xl" />
            <Footer />
        </>
    );
}
