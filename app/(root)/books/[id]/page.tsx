import { auth } from "@/auth"
import { BookOverview } from "@/components/BookOverview"
import { BookVideo } from "@/components/BookVideo"
import { sampleBooks } from "@/constants"
import { getBookDetails } from "@/lib/admin/actions/book"

export default async function BookDetails({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id
    const session = await auth();
    const bookDetails = await getBookDetails(id)

    return (
        <>
            <BookOverview {...bookDetails} userId={session?.user?.id as string} />

            <div className="book-details">
                <div className="flex-[1.5]">
                    <section className="flex flex-col gap-7">
                        <h3>Video</h3>

                        <BookVideo videoUrl={bookDetails.videoUrl} />
                    </section>
                    <section className="mt-10 flex flex-col gap-7">
                        <div className="space-y-5 text-xl text-light-100">
                            <h3>Summary</h3>

                            <div className="space-y-5 text-xl text-light-100">
                                {
                                    bookDetails.summary.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}