import PublicationBar from "./PublicationBar";

export default function HomePublications({}) {
  return (
    <div className="flex flex-col justify-center items-center gap-sub-large">
      <PublicationBar></PublicationBar>
      <PublicationBar></PublicationBar>
      <PublicationBar></PublicationBar>
    </div>
  );
}
