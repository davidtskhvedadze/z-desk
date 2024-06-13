"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem,AccordionTrigger } from "@radix-ui/react-accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

export type TicketCardProps = {
    id: number;
    name: string;
    email: string;
    description: string;
    status: string;
};

export type FormData = {
    status: string;
    response: string;
};

const formSchema = z.object({
    status: z.string().optional(),
    response: z.string().min(1, {
      message: "Response is required",
    }).max(500, {
      message: "Response must be less than 500 characters",
    }),
  });
  
export function TicketCard(ticket: TicketCardProps) {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          status: ticket.status,
          response: "",
        },
      });
    
    const onSubmit = async (data: FormData) => {
        console.log(data);
    }

    const [status, setStatus] = useState(ticket.status);

    const onStatusChange = (id: number, newStatus: string) => {  
      console.log(id, newStatus);
      fetch('/api/status', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status: newStatus }),
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          setStatus(newStatus); // Update the local status state here
      })
      .catch((error) => console.error(error));
  };

    return (
      <div className={`p-4 rounded-md ${status === 'in progress' ? 'bg-orange-500' : status === 'resolved' ? 'bg-green-500' : ''}`} style={{backgroundColor: `rgba(${status === 'in progress' ? '255,165,0' : status === 'resolved' ? '0,128,0' : '192,192,192'}, 0.5)`}}>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger onClick={() => {
                form.setValue('response', '');
            }}>{ticket.name}</AccordionTrigger>
            <AccordionContent>
              <p>Email: {ticket.email}</p>
              <p>Summary: {ticket.description}</p>
              <FormField control={form.control} name="status" render={({field}) => {
                return <FormItem>
                <FormLabel>Ticket Status</FormLabel>
                <FormControl>
                 <Select value={status} onValueChange={(value) => { onStatusChange(ticket.id, value);}}>
                    <SelectTrigger>
                      <SelectValue placeholder={status || 'Select status'}>{status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">new</SelectItem>
                      <SelectItem value="in progress">in progress</SelectItem>
                      <SelectItem value="resolved">resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  </FormControl>
                  </FormItem>
                 }}
                 />
                <FormField control={form.control} name="response" render={({field}) => {
                return <FormItem>
                <FormControl>
                    <Textarea placeholder="Respond to ticket..." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
                }}
                />
              <Button type="submit">Submit</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
    </div>
    );
};