// src/contexts/AuthContext.tsx
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Función helper para crear usuario mock
const createMockUser = (email: string = 'developer@test.com'): User => {
  const mockUser = {
    uid: 'dev-user-id-12345',
    email: email,
    displayName: 'Developer Mode',
    photoURL: null,
    emailVerified: true,
    isAnonymous: false,
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString()
    },
    providerData: [
      {
        uid: email,
        displayName: 'Developer Mode',
        email: email,
        photoURL: null,
        providerId: 'password',
        phoneNumber: null
      }
    ],
    refreshToken: 'dev-refresh-token',
    tenantId: null,
    delete: async () => {},
    getIdToken: async (forceRefresh?: boolean) => 'dev-id-token',
    getIdTokenResult: async (forceRefresh?: boolean) => ({
      token: 'dev-id-token',
      signInProvider: 'password',
      signInSecondFactor: null,
      claims: { email: email, email_verified: true },
      expirationTime: new Date(Date.now() + 3600000).toISOString(),
      issuedAtTime: new Date().toISOString(),
      authTime: new Date().toISOString()
    }),
    reload: async () => {},
    toJSON: () => ({}),
    phoneNumber: null,
    providerId: 'password'
  } as any; // Usamos 'as any' para evitar problemas con el tipo estricto de User

  return mockUser;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 🔥 MODO DESARROLLO - Saltar autenticación
    if (__DEV__) {
      console.log('🔧 MODO DESARROLLO ACTIVADO - Usuario mock creado');
      const devUser = createMockUser();
      
      setUser(devUser);
      setLoading(false);
      
      // Redirigir automáticamente al home en desarrollo
      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 500);
      
      return;
    }

    // 🔥 MODO PRODUCCIÓN - Comportamiento normal
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = async (email: string, password: string) => {
    // En desarrollo, crear usuario mock y redirigir
    if (__DEV__) {
      console.log('🔧 MODO DESARROLLO: Login automático para:', email);
      const devUser = createMockUser(email);
      
      setUser(devUser);
      router.replace("/(tabs)/home");
      return;
    }

    // En producción, login normal
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    // En desarrollo, crear usuario mock y redirigir
    if (__DEV__) {
      console.log('🔧 MODO DESARROLLO: Registro automático para:', email);
      const devUser = createMockUser(email);
      
      setUser(devUser);
      router.replace("/(tabs)/home");
      return;
    }

    // En producción, registro normal
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    // En desarrollo, solo limpiar estado
    if (__DEV__) {
      console.log('🔧 MODO DESARROLLO: Sign out simulado');
      setUser(null);
      router.replace("/login");
      return;
    }

    // En producción, sign out normal
    await fbSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
