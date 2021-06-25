import firebase from "firebase";
import { 
  createContext, 
  useState, 
  ReactNode, 
  useEffect 
} from "react";
import { auth } from "../services/firebase";

type User = {
  id: string;
  nome: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProps = {
  children: ReactNode
}


export function AuthContextProvider (props: AuthContextProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          nome: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider)
    
    
    if(result.user) {
      const { displayName, photoURL, uid} = result.user

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        nome: displayName,
        avatar: photoURL
      })
    }
  }
  return (
     <AuthContext.Provider value={{ user, singInWithGoogle }}>
       {props.children}
     </AuthContext.Provider>
  );
}