import MobileSearchBar from "@/components/home/MobileSearchBar";
import Result from "@/components/search/Result";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Search",
};

export default async function Search() {
  return (
    <main className="mx-extra-small flex flex-col items-center gap-small mobile-large:mx-small laptop-large:mx-extra-large ">
      <MobileSearchBar></MobileSearchBar>
      <Result></Result>
    </main>
  );
}
