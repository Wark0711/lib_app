'use server'

import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export const createBook = async (params: BookParams) => {
    try {
        const newBook = await db.insert(books).values({ ...params, availableCopies: params.totalCopies }).returning()

        return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) }
    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'An error ocurred while creating the book' }
    }
}

export const checkForAdmin = async (session: Session) => {
    if (!session?.user?.id) return false

    const isAdmin = await db.select({ isAdmin: users.role }).from(users).where(eq(users.id, session.user.id)).limit(1).then(res => res[0]?.isAdmin === 'ADMIN')
    return isAdmin
}

export const getLatestBooks = async () => {
    const latestBooks: Book[] = await db.select().from(books).limit(11).orderBy(desc(books.createdAt))
    return latestBooks
}

export const getAllBooks = async () => {
    const allBooks: Book[] = await db.select().from(books).orderBy(desc(books.createdAt))
    return allBooks
}

export const getBookDetails = async (id: string) => {
    const [getDetails] = await db.select().from(books).where(eq(books.id, id)).limit(1)
    if (!getDetails) return redirect('/404')

    return getDetails
}