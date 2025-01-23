'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    };
}

export function BorrowBook({ userId, bookId, borrowingEligibility: { isEligible, message } }: Props) {

    const router = useRouter()
    const [borrowing, setBorrowing] = useState(false)

    const handleBorrowBook = async () => {
        if (!isEligible) {
            return toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        }

        setBorrowing(true);

        try {
            const result = await borrowBook({ bookId, userId });

            if (result.success) {
                toast({
                    title: "Success",
                    description: "Book borrowed successfully",
                });

                router.push("/");
            } 
            else {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive",
                });
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while borrowing the book",
                variant: "destructive",
            });
        }
        finally {
            setBorrowing(false);
        }
    };

    return (
        <Button className="book-overview_btn" onClick={handleBorrowBook} disabled={borrowing}>
            <Image src={'/icons/book.svg'} alt="book" height={20} width={20} />
            <p className="font-bebas-neue text-xl text-dark-100">{borrowing ? "Borrowing ..." : "Borrow Book"}</p>
        </Button>
    )
}