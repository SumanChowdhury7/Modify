import { useState } from "react";
import "./App.css";
import { AuthProvider } from "./features/auth/auth.context";

import AppRoutes from "./AppRoutes";
import { SongContextProvider } from "./features/expression/song.contex";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <SongContextProvider>
        <AppRoutes />
      </SongContextProvider>
    </AuthProvider>
  );
}

export default App;
