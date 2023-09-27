import Form from "@/components/form/Form";
import AllButton from "@/components/button/ButtonShowcase";
import ImageDiv from "@/components/div/ImageDiv";
import H1 from "@/components/text/H1";
import H2 from "@/components/text/H2";
import H3 from "@/components/text/H3";
import P from "@/components/text/P";
import NewPostBar from "@/components/NewPostBar";
import PublicationBar from "@/components/PublicationBar";

export default function Home() {
  return (
    <main className="flex justify-between flex-col items-center flex-wrap gap-large mx-auto">
      <NewPostBar></NewPostBar>
      <PublicationBar></PublicationBar>
    </main>
  );
}
