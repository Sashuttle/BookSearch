//FIXME: Create an Apollo Provider to make every request work with the Apollo server
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ApolloClient, ApolloProvider } from '@apollo/react-hooks';
//import { Outlet } from 'react-router-dom';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import Navbar from './components/Navbar';
import './App.css';


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
      <Navbar />
      <Routes>
        <Route exact path='/' component={SavedBooks} />
        <Route exact path='/saved' component={SearchBooks} />
        <Route render={() => <h1 className='display-2'>Wrong Page</h1>} />
      </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
