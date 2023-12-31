import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/ContactList';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { DefaultSidebar } from './components/sidebar';
import { ThemeProvider } from "@material-tailwind/react";
import ContactDetailsPage from './pages/ContactDetailsPage';
import NewContact from './pages/ContactForm';
import Charts from './pages/Charts';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">

      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <DefaultSidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact/:id" element={<ContactDetailsPage />} />
              <Route path="/new-contact" element={<NewContact />} />
              <Route path="/charts-and-maps" element={<Charts />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
