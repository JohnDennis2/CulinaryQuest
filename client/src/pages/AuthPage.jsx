import React from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
    const AuthPage = () => {
        return (
          <div>
            <h1>Authentication Page</h1>
            <div>
              <h2>Sign Up</h2>
              <SignUpForm />
            </div>
            <div>
              <h2>Login</h2>
              <LoginForm />
            </div>
          </div>
        );
      };
export default AuthPage;

import './App.css';
import { Outlet } from 'react-router-dom';
// Important for API Consumption: To enable interaction with our GraphQL API on the front end, we utilize these tools to develop the client-side behavior
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from './pages/Header';
import Footer from './pages/Footer';
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });
function App() {
  return (
    <ApolloProvider client={client}>
    <div className="container" >
      <Header />
      <Outlet />
      <Footer />
    </div>
    </ApolloProvider>
  );
}
export default App;