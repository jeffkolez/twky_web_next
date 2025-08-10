import { getProfile } from '@/queries';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProfileSummary from '@/components/ProfileSummary/ProfileSummary';
import Related from '@/components/Featured/Related';
import ProfileContent from '@/components/ProfileContent/ProfileContent';
import { JsonLdSchema } from '@/types';
import { notFound } from 'next/navigation';
import { Space } from '@mantine/core';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const data = await getProfile({ queryKey: ["getProfile", { id }] });
    if (!data) {
        return { title: "Profile not found | They Will Kill You" };
    }
    return {
        title: `The Story of ${data.type} ${data.name} | They Will Kill You`,
        description: data.markup?.description || "",
    };
}

export default async function ProfileRoute({ params }: { params: { id: string } }) {
    const data = await getProfile({ queryKey: ['getProfile', { id: params.id }] });

    if (!data) notFound();

    const jsonLd: JsonLdSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        identifier: data.shortUrl || '',
        name: data.markup?.name || '',
        alternateName: data.markup?.alternateName || null,
        nationality: {
        "@type": "Country",
        name: typeof data.markup?.nationality === 'string'
            ? data.markup.nationality
            : 'Unknown',
        },
        description: data.markup?.description || '',
        knowsAbout: Array.isArray(data.markup?.knowsAbout) ? data.markup.knowsAbout : [],
        subjectOf: {
        "@type": "Thing",
        name: typeof data.markup?.subjectOf === 'object' && data.markup?.subjectOf?.name
            ? data.markup.subjectOf.name
            : 'Unknown',
        },
        numberOfVictims: data.markup?.numberOfVictims || 'Unknown',
        image: data.markup?.image || [],
    };

    return (
        <>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <Header />
        <ProfileSummary data={data} isLoading={false} />
        <ProfileContent data={data} />
        <Related title="Related Profiles" shortUrl={data.shortUrl || ''} />
        <Space h="xl" />
        <Footer />
        </>
    );
}
