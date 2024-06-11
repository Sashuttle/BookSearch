//setting up apollo client for REACT
import {gql} from '@apollo/client';

//user and saved book data (loads savedbooks)
export const GET_ME = gql`
    {
        me{
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                bookId
                image
                link
                title
                description
            }
        }
    }
`;