import type { Metadata } from "next";
import { Space } from "@mantine/core";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import IndexList from "@/components/Profiles/IndexList";
import SignificantDatesPage from "@/components/SignificantDates/SignificantDatesPage";

function capFirst(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ date: string }>;
}): Promise<Metadata> {
    const capitalizeFirstLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    const { date } = await params;
    const month = date.replace(/[0-9]/g, "");
    let day = date.replace(/[a-zA-Z]/g, "");
    if (day.startsWith("0")) {
        day = day.substring(1);
    }
    const formattedMonth = capitalizeFirstLetter(month);
    const formatted = `${formattedMonth} ${day} In History`;
    return {
        title: `${formatted} This Day in Infamy | They Will Kill You`,
        alternates: {
            canonical: `https://theywillkillyou.com/date/${encodeURIComponent(date)}`,
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ date: string }>;
}) {
    const { date } = await params;
    const month = date.replace(/[0-9]/g, "");
    let day = date.replace(/[a-zA-Z]/g, "");
    if (day.startsWith("0")) {
        day = day.substring(1);
    }
    const formattedMonth = capFirst(month);
    const formatted = `${formattedMonth} ${day} In History`;

    return (
        <>
            <Header />
            <SignificantDatesPage title={formatted} dateParam={date} />
            <IndexList />
            <Space h="xl" />
            <Space h="xl" />
            <Footer />
        </>
    );
}
