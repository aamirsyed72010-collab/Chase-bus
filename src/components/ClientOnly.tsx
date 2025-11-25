"use client";

import { useEffect, useState, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

export default function ClientOnly({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
