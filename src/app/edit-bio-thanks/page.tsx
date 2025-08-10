import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space } from "@mantine/core";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Related from "@/components/Featured/Related";
import EditBioThanks from "@/components/Profiles/EditThanks"; // must be a client component if it uses hooks
import { getProfile } from "@/queries";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ id?: string; shortUrl?: string }>;
}): Promise<Metadata> {
    const sp = await searchParams;
    const id = sp.shortUrl ?? sp.id ?? "";
    if (!id) {
        return { title: "Suggest an update | They Will Kill You" };
    }

    const data = await getProfile({ queryKey: ["getProfile", { id }] });
    if (!data) {
        return { title: "Profile not found | They Will Kill You" };
    }

    return {
        title: `Suggest an update for ${data.type} ${data.name} | They Will Kill You`,
        description: data.markup?.description || "",
    };
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id?: string; shortUrl?: string }>;
}) {
    const sp = await searchParams;
    const id = sp.shortUrl ?? sp.id ?? "";
    if (!id) {
        notFound();
    }

    const data = await getProfile({ queryKey: ["getProfile", { id }] });
    if (!data) {
        notFound();
    }

    return (
        <>
            <Header />
            <EditBioThanks data={data} />
            <Related title="Related Profiles" shortUrl={data.shortUrl || ""} />
            <Space h="xl" />
            <Footer />
        </>
    );
}
