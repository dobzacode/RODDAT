import Header from "@/components/header/Header";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Input from "@/components/form/Input";
import SearchBar from "@/components/form/SearchBar";
import UserSnippet from "@/components/user/UserSnippet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  viewport: "width=device-width,initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        height="h-[100px]"
        //top-[100px]
        textColor="text-neutral80"
        textType="sub-heading"
        logoColor="text-neutral80"
        logoType="heading font-bold tracking-widest"
        mobileTextType="sub-heading"
        bgColor="bg-primary10 border-b-4 border-neutral80"
      >
        <SearchBar></SearchBar>
        <UserSnippet></UserSnippet>
      </Header>
      {children}
      {/* <Footer
        height="h-[100px]"
        bgColor="bg-black"
        flex="flex items-center justify-center"
      ></Footer> */}
    </>
  );
}
