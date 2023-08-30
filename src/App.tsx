import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/ContactList';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { DefaultSidebar } from './components/sidebar';
import { ThemeProvider } from "@material-tailwind/react";

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">

      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
      <DefaultSidebar />
    </div>
  );
}

export default App;
