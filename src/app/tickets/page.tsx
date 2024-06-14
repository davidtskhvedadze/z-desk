"use client";

import { TicketCard } from "@/components/TicketCard";
import { useState, useEffect } from "react";
import { useHasToken } from "../layout";
import { InvalidPage } from "@/components/InvalidPage";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


 enum TicketStatus {
    New = "new",
    InProgress = "in progress",
    Resolved = "resolved",
 }
export type Ticket = {
    id: number;
    name: string;
    email: string;
    description: string;
    status: TicketStatus;
};

export default function Page() {
const { hasToken } = useHasToken();
const [tickets, setTickets] = useState<Ticket[]>([]);

 const fetchTickets = async () => {
        const response = await fetch("/api/tickets");
        if (!response.ok) {
            throw new Error("Failed to fetch tickets");
        }
        const fetchedTickets = await response.json();
        setTickets(fetchedTickets);
 };

    useEffect(() => {
        if (hasToken) {
            fetchTickets();
        }
    }, [hasToken]);

    return (
        <div>
            {hasToken ? (
                <Table>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell><TicketCard {...ticket} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <InvalidPage />
            )}
        </div>
    );
}


    
    
