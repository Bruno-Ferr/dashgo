import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

type User = {
  name: string;
  email: string;
  image: string;
  permissions: string;
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function signOut() {
  destroyCookie(undefined, 'dashgo.token')
  destroyCookie(undefined, 'dashgo.refreshToken')

  Router.push('/')
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const {'dashgo.token': token } = parseCookies()

    if(token) {
      api.get("http://localhost:3333/me").then(res => {
        const { name, email, image, permissions, roles } = res.data; 

        setUser({ name, email, image, permissions, roles })
      }).catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const res = await api.post("http://localhost:3333/sessions" , {
        email,
        password
      })

      const { token, refreshToken, image, name, permissions, roles } = res.data;

      console.log(res.data)

      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        name,
        email,
        image,
        permissions,
        roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard')
    } catch (error) {
      toast.error("Usuário ou senha incorretos!", {
          theme: "dark",
        });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}