import { ApolloClient } from 'apollo-client';
import { getToken } from '../providers/auth';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, HttpLink, from, } from "apollo-boost";

const httpLink = new HttpLink({ uri: 'https://unicap-social.herokuapp.com/' });

const authMiddleware = setContext(operation =>
  getToken().then((token) => {
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  })
);

const client = new ApolloClient({    
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
});

export default client;