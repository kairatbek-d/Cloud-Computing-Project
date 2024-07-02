import { gql } from "@apollo/client";

export const LOAD_POSTS = gql`
    query {
        getPosts {
            id
            ISNB,
            title,
            author,
            genres,
            url,
            PickUPAddress,
            username
        }
        getProfiles {
            id,
            Address,
            education,
            profession,
            phone,
            Address,
            username,
            points
        }
    }
`;

export const LOAD_PURCHASE = gql`
    query {
        getPurchase {
            PickUPAddress
            idnum
        }
    }
`;

export const LOAD_PROFILES = gql`
    query {
        getProfiles {
            id,
            Address,
            education,
            profession,
            phone,
            Address,
            username,
            points
        }
    }
`;