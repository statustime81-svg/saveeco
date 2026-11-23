import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const client = supabase;

    if (!client) {
      setLoading(false);

      return () => {
        active = false;
      };
    }

    async function checkUser(
      activeClient: NonNullable<typeof supabase>,
    ) {
      const { data } = await activeClient.auth.getUser();

      if (!active) return;

      const currentUser = data.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile } = await activeClient
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (active) {
          setIsAdmin(profile?.role === "admin");
        }
      } else {
        setIsAdmin(false);
      }

      if (active) {
        setLoading(false);
      }
    }

    void checkUser(client);

    const { data: listener } = client.auth.onAuthStateChange(() => {
      void checkUser(client);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, isAdmin, loading };
}