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
import { useToast } from "@/components/ui/use-toast";
import DownArrow from "../../public/down-arrow-svgrepo-com.svg";
import Image from 'next/image';

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

  const [status, setStatus] = useState(ticket.status);
  const { toast } = useToast();
  
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          status: ticket.status,
          response: "",
        },
      });
    
    const onSubmit = async (data: FormData) => {
        fetch('/api/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: ticket.id, response: data.response }),
        })
        .then((response) => response.json())
        .then((data) => {
            toast({
                title: 'Response submitted',
                description: 'Your response has been submitted successfully!',
            })
            form.reset();
            console.log(`
              Hi ${ticket.name},
              An admin has responded to your ticket:
              ${data.message}`)
        })
        .catch((error) => console.error(error));
    }

   

    const onStatusChange = (id: number, newStatus: string) => {  
      fetch('/api/status', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status: newStatus }),
      })
      .then((response) => response.json())
      .then((data) => {
          setStatus(newStatus);
      })
      .catch((error) => console.error(error));
  };

    return (
      <div className={`max-w-md mx-auto p-4 rounded-md shadow-lg ${status === 'in progress' ? 'bg-orange-500 bg-opacity-50' : status === 'resolved' ? 'bg-green-500 bg-opacity-50' : 'bg-gray-300'}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger onClick={() => {
                form.setValue('response', '');
              }} className="font-bold text-xl text-center w-full flex justify-center items-center">{ticket.name}
               <Image src={DownArrow} alt="Down arrow" className="ml-auto w-5 h-5" />
               </AccordionTrigger>
              <AccordionContent className="mt-4">
              <p className="text-sm text-gray-900 mt-2 bg-yellow-100 p-2 rounded">Email: {ticket.email}</p>
              <p className="text-sm text-gray-900 mt-4 bg-yellow-100 p-2 rounded">Summary: {ticket.description}</p>
                <FormField control={form.control} name="status" render={({field}) => {
                  return (
                    <div className="mt-4">
                      <FormLabel className="block text-sm font-medium text-gray-700">Ticket Status</FormLabel>
                      <Select value={status} onValueChange={(value) => { onStatusChange(ticket.id, value);}} >
                        <SelectTrigger>
                          <SelectValue placeholder={status || 'Select status'}>{status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">new</SelectItem>
                          <SelectItem value="in progress">in progress</SelectItem>
                          <SelectItem value="resolved">resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }} />
                <FormField control={form.control} name="response" render={({field}) => {
                  return (
                    <div className="mt-4">
                      <Textarea placeholder="Respond to ticket..." {...field} className="mt-1 block w-full"/>
                      <FormMessage />
                    </div>
                  );
                }} />
                <Button type="submit" className="mt-4 w-full py-2 px-4 rounded">Submit</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
    );
};