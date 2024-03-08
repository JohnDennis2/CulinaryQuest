import { gql } from '@apollo/client';



export const LOGIN_USER = gql`
  mutation loginUser($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_QUEST = gql`
  mutation saveQuest($questData: questInput) {
    saveBook(questData: $questData) {
      _id
      username
      email
      savedQuest {
        questId
        authors
        title
        description
        
      }
    }
  }
`;

export const REMOVE_QUEST = gql`
  mutation removeQuest($questId: ID) {
    removeQuest(questId: $questId) {
      _id
      username
      email
      savedQuest {
        questId
        authors
        title
        description
        
      }
    }
  }
`;