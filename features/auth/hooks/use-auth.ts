import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAuth } from "@/features/auth/queries/get-auth"; 
    
    
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setFetched] = useState(false);

  const pathName = usePathname();

  useEffect(()=> {
    const fetchUser = async() => {
      const { user } = await getAuth();
      setUser(user);
      setFetched(true);
    };

    fetchUser();
  }, [pathName]);

  return { user, isFetched };
};

export { useAuth };