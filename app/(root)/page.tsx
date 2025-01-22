import { auth } from "@/auth";
import { BookList } from "@/components/BookList";
import { BookOverview } from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

export default async function Home() {

  const session = await auth()

  return (
    <>
      <BookOverview {...sampleBooks[2]} />
      <BookList title={'Latest Books'} books={sampleBooks} containerClassName={'mt-20'} />
    </>
  );
}
