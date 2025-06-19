"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useClientSession = (initialSession: Session | null) => {
  const { data: session, status } = useSession();
  const [currentSession, setCurrentSession] = useState(initialSession);
  // if the session which is in client side changed
  // we update the current session state to the new session
  useEffect(() => {
    if (session) {
      setCurrentSession(session);
    }
  }, [session]);

  // if the initial session which is in the server side changed
  // we update the current session state to the new initial session
  useEffect(() => {
    if (initialSession) {
      setCurrentSession(initialSession);
    }
  }, [initialSession]);
  return { data: currentSession, status };
};

// in this hook, we send our initial session to the client side
// and then we listen to the session changes using useSession hook
// and update the current session state accordingly if the session changes
// this way we can use the session data in our components without worrying about hydration issues
// this hook is used in the AuthButtons component to get the current session
// and in the Header component to get the initial session