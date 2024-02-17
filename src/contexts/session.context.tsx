import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ISession } from '../types/Session.types';

export interface ISessionContext {
  sessions: ISession[];
  setSessions: React.Dispatch<React.SetStateAction<ISession[]>>;
  filteredSessions: ISession[];
  setFilteredSessions: React.Dispatch<React.SetStateAction<ISession[]>>;
}

export const SessionContext = createContext<ISessionContext>({
  sessions: [],
  filteredSessions: [],
  setFilteredSessions: () => { },
  setSessions: () => { },
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<ISession[]>([]);

  const sessionContextValue = useMemo(() => ({ sessions, setSessions, filteredSessions, setFilteredSessions }), [sessions, setSessions, filteredSessions, setFilteredSessions]);

  useEffect(() => {
    setFilteredSessions(sessions);
  }, [sessions]);

  return (
    <SessionContext.Provider value={sessionContextValue}>
      {children}
    </SessionContext.Provider>
  );
}
