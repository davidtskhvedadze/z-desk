
import React from "react";
import { toast } from "./ui/use-toast";
import { useEvents } from "@/context/eventsContext";



export function SignOut() {
   const events = useEvents();

   const handleSignOut = async () => {
        
        try {
          const response = await fetch('/api/signout', {
            method: 'POST',
            credentials: 'include'
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            toast({
              title: 'Failed to sign out',
              description: errorData.message,
            })
            return;
          }
          events.emit('sessionChanged');
          toast({
            title: 'Signed out',
            description: 'You have successfully signed out',
          })
        } catch (error) {
          console.error('Failed to sign out:', error);
        }
      }

    return (
        <div className="mr-4 cursor-pointer" onClick={handleSignOut}>Sign Out</div>
    );
}