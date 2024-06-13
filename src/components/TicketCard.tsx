"use client";

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

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger onClick={() => {
                form.setValue('status', ticket.status);
                form.setValue('response', '');
            }}>{ticket.name}</AccordionTrigger>
            <AccordionContent>
              <p>Email: {ticket.email}</p>
              <p>Summary: {ticket.description}</p>
              <FormField control={form.control} name="status" render={({field}) => {
                return <FormItem>
                <FormLabel>Ticket Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value || 'Select status'}>{field.value}</SelectValue>
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
    );
};