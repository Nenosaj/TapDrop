import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function PrivateRoute({ children }) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // true if user exists
      setCheckingAuth(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  if (checkingAuth) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
