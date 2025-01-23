import { auth } from "@/auth";
import { BookList } from "@/components/BookList";
import { BookOverview } from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { getLatestBooks } from "@/lib/admin/actions/book";

export default async function Home() {

  const session = await auth()  
  const latestBooks = await getLatestBooks()

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList title={'Latest Books'} books={latestBooks.slice(1)} containerClassName={'mt-20'} />
    </>
  );
}
