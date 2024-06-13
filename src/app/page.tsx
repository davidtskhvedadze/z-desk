"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }).max(50, {
    message: "Name must be less than 50 characters",
  }),
  email: z.string().email(),
  description: z.string().min(1, {
    message: "Description is required",
  }).max(500, {
    message: "Description must be less than 500 characters",
  }),
});

export default function Page() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessages([...errorMessages, "Failed to submit ticket"]);
          throw new Error("Failed to submit ticket");
        }
        const ticket = await response.json();
        form.reset();
        setErrorMessages([]);
        toast({
          title: "Ticket submitted",
          description: "Your ticket has been submitted successfully!",
          duration: 5000,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Ticket Failed to submit",
          description: "An error occurred while submitting the ticket. Please try again.",
          duration: 5000,
        });
    }
    };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Submit a Ticket</h1>
      <Form {...form}>
        <form className="max-w-md w-full flex flex-col gap-4 mb-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField control={form.control} name="name" render={({field}) => {
            return <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="text" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          }}/>
          <FormField control={form.control} name="email" render={({field}) => {
            return <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" type="email" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          }}/>
          <FormField control={form.control} name="description" render={({field}) => {
            return <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your message" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          }}/>
          <Button type="submit">
          Submit
          </Button>
        </form>
      </Form>
      {errorMessages.map((message, index) => (
        <Alert key={index} variant="destructive" className="max-w-md w-full flex flex-col gap-2">
          <Terminal className-="h-4 w-4"/>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ))}
    </main>

  );
}
