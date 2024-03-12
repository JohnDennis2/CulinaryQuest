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
            <div style={{
                margin: 0,
                padding: 0,
                height: '100vh',
                overflowX: 'hidden',
                backgroundColor: '#EAE7B1'
            }}>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </ApolloProvider>
    );
}
export default App;
