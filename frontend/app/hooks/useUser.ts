import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        setUser({ id: data.id, username: data.username });
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return user;
}
