"use client";

import { Space } from "@mantine/core";
import Header from "@/components/Header/Header";
import SignificantDatesModule from "@/components/SignificantDates/SignificantDatesModule";
import Quote from "@/components/Quote/Quote";
import Footer from "@/components/Footer/Footer";
import IndexList from "@/components/Profiles/IndexList";
import EmailListSignup from "@/components/Card/Email/EmailListSignup";
import EzoicAd from "@/components/Ads/EzoicAd";

export default function HomeClient() {
  return (
    <>
      <Header />
      <EzoicAd />
      <SignificantDatesModule title="This Day In History" />
      <IndexList />
      <EmailListSignup />
      <Quote />
      <Space h="xl" />
      <Space h="xl" />
      <Footer />
    </>
  );
}
