import React, { createContext, useContext, useState } from 'react';
import { EventEmitter } from 'events';

const EventsContext = createContext(new EventEmitter());

export const useEvents = () => useContext(EventsContext);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emitter] = useState(() => new EventEmitter());

  return (
    <EventsContext.Provider value={emitter}>
      {children}
    </EventsContext.Provider>
  );
};