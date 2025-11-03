// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);
        // Aquí asignamos el rol: admin por correo, usuario por defecto
        if (u.email === "admin@petcare.com") {
          setRol("admin");
        } else {
          setRol("usuario");
        }
      } else {
        setUser(null);
        setRol(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, rol, loading }}>
      {children}
    </UserContext.Provider>
  );
}
