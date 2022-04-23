import React from "react";
import { AuthContextProvider } from "./context/authContext";

import Main from "./Main";

export default function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}
