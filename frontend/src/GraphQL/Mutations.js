import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $ISNB: String!,
        $title: String!,
        $author: String!,
        $genres: String!,
        $url: String!
        $PickUPAddress:String!
    ) {
        createPost(
            ISNB: $ISNB,
            title:$title,
            author:$author,
            genres:$genres,
            url:$url,
            PickUPAddress:$PickUPAddress,
        ) {
            id,
            ISNB,
            title,
            author,
            genres,
            url,
            PickUPAddress,
            username,
        }
    }
`;

export const CREATE_PURCHASE_MUTATION = gql`
    mutation (
        $PickUPAddress:String!
        $idnum: String
    ) {
        createPurchase(
            PickUPAddress:$PickUPAddress
            idnum: $idnum
        ) {
            PickUPAddress
            idnum
        }
    }
`;

export const UPDATE_POST_MUTATION = gql`
    mutation($idnum:String, $isAvailable:Boolean!){
        updatePost(idnum:$idnum,isAvailable:$isAvailable){
            idnum,
            isAvailable
        }
    }
`;

export const DELETE_PURCHASE_MUTATION = gql`
    mutation($purchaseId:String!){
        deletePurchase(purchaseId:$purchaseId)
    }
`;

export const UPDATE_POINTS_MUTATION = gql`
    mutation($username:String!,$points:Int!){
        updatePoints(username:$username,points:$points){
            username,
            points
        }
    }
`;
 
export const CREATE_PROFILE_MUTATION = gql `
    mutation createProfile(
        $userInput: UserInput
    ) {
        createProfile(
            userInput: $userInput
        ) {
            education,
            profession,
            phone,
            Address,
            points
        }
    }
`;

export const DELETE_PROFILE_MUTATION = gql`
    mutation($user_id:ID!){
        deactivateProfile(user_id:$user_id)
    }
`;