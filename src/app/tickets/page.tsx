"use client";

import { TicketCard } from "@/components/TicketCard";
import { useState, useEffect } from "react";
import { useHasToken } from "../layout";
import { InvalidPage } from "@/components/InvalidPage";
import { Pagination, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"


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
const [currentPage, setCurrentPage] = useState(1);
const ticketsPerPage = 5;

 const fetchTickets = async () => {
      const response = await fetch("/api/tickets", {
        credentials: 'include', // Include cookies in the request
      });
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

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const totalPages = Math.ceil(tickets.length / ticketsPerPage);

    return (
<div className="flex flex-col justify-center items-center min-h-screen animate-fadeIn">
      {hasToken ? (
        <>
          <h1 className="text-4xl font-bold text-center mb-4 mt-4">Tickets</h1>
          <div className="flex flex-col w-full items-center animate-slideUp">
          <div className="w-full max-w-sm border-2 border-gray-300 rounded-md overflow-hidden my-4">
            <Table>
              <TableBody>
              {currentTickets.length === 0 ? (
                <TableRow>
                  <TableCell>
                  <p className="italic text-center py-2">No tickets available</p>
                  </TableCell>
                </TableRow>
              ) : (
                currentTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <TicketCard {...ticket} fetchTickets={fetchTickets} />
                    </TableCell>
                  </TableRow>
                ))
              )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center items-center my-4 mr-4">
            <Pagination>
              <PaginationPrevious
                isActive={currentPage !== 1}
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationLink
                  key={page}
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              ))}
              <PaginationNext
                isActive={currentPage !== totalPages}
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              />
            </Pagination>
          </div>
          </div>
        </>
      ) : (
        <InvalidPage />
      )}
    </div>
    );
}


    
    
