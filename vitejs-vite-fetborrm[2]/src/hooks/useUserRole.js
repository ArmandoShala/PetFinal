import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";

function useUserRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const fetchRole = async () => {
      const docRef = doc(db, "roles", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRole(docSnap.data().rol); // "admin" o "usuario"
      } else {
        setRole("usuario"); // Rol por defecto si no existe
      }
    };

    fetchRole();
  }, []);

  return role;
}

export default useUserRole;
