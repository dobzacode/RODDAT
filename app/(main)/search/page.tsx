import Result from "@/components/search/Result";

export const revalidate = 0;

export default async function Home() {
  return (
    <main className="mx-extra-small flex justify-center gap-medium mobile-large:mx-small laptop-large:mx-extra-large ">
      <Result></Result>
    </main>
  );
}
