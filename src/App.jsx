import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
