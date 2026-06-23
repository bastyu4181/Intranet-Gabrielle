import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { type Usuario } from "../types/Usuario";
interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  function login(email: string, password: string): boolean {
    if (email === "gabrielle@studio.com" && password === "1234") {
      const nuevoUsuario: Usuario = { email, nombre: "Gabrielle" };
      setUsuario(nuevoUsuario);
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
      return true;
    }
    return false;
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
