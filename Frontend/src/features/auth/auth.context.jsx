import { createContext, useState, useEffect } from "react";
import { register,login,logout,getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


const handleRegister = async (username,email,password)=>{
setLoading(true);
try{
    const res = await register(username,email,password)
    setUser(res.user)
    return res;
} finally{
    setLoading(false)
}
}

const handleLogin = async (identifier,password)=>{
  setLoading(true);
  try{
    const res = await login(identifier,password)
    setUser(res.user)
    return res
  } finally {
      setLoading(false);
    }
}
const handleLogout = async ()=>{
  setLoading(true);
  try {
    await logout();     
  } finally {
    setLoading(false);
  }
}

const fetchMe = async () => {
    setLoading(true)
    try {
      const res = await getMe();
      setUser(res.user);
      console.log(res)
    } catch (err) {
      throw err
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMe();
  }, []);
return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );


}