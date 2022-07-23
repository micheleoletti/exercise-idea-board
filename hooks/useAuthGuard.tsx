import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UseAuthGuardProps {
  redirectUrl?: string;
}

interface UseAuthGuardResult {
  canAccess: boolean;
}

export default function useAuthGuard({
  redirectUrl,
}: UseAuthGuardProps): UseAuthGuardResult {
  const router = useRouter();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      router.push(redirectUrl ?? "/auth/sign-in");
      setCanAccess(false);
    } else {
      setCanAccess(true);
    }
  }, []);

  return { canAccess };
}
