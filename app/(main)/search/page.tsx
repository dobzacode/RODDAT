import MobileSearchBar from "@/components/home/MobileSearchBar";
import Result from "@/components/search/Result";

export const revalidate = 0;

export default async function Home() {
  return (
    <main className="mx-extra-small flex flex-col items-center gap-small mobile-large:mx-small laptop-large:mx-extra-large ">
      <MobileSearchBar></MobileSearchBar>
      <Result></Result>
    </main>
  );
}
