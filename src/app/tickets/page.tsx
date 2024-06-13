"use client";

import { TicketCard } from "@/components/TicketCard";
import { useState, useEffect } from "react";


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
        fetchTickets();
    }, []);

    return (
        <div>
            {tickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
            ))}
        </div>
    );
}

    
{/* <>
{!isSignedIn ? (
<div>
    <h1>Sign in to view tickets</h1>
</div>
) : (
<div>
    {tickets.map((ticket) => (
    <TicketCard key={ticket.id} {...ticket} />
    ))}
</div>
)}
</> */}

    
    
