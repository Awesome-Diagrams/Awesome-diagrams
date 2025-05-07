import { useEffect, useState } from "react";

export function useUser() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        setUsername(data.username);
      })
      .catch(() => {
        setUsername(null);
      });
  }, []);

  return username;
}
