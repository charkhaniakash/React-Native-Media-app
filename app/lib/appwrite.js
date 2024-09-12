import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  plateform: "com.akash.auro",
  projectId: "66b27300000db7d9bd1b",
  databaseId: "66b2747700137b887038",
  userCollectionId: "66b274a30017871a7a51",
  videoCollectionsId: "66b274cb0001c8ce85ac",
  storageId: "66b2767b0025d8a2ea47",
};

const {
  endpoint,
  plateform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionsId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.plateform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// sign in user

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// get current user

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId , videoCollectionsId);
    return posts.documents
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId , videoCollectionsId,
      [Query.orderDesc('$createdAt' , Query.limit(7))]
    );
    return posts.documents
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getSearchedResults = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId , videoCollectionsId,
      [Query.search('title' , query)]
    );
    return posts.documents
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(databaseId , videoCollectionsId,
      [Query.equal('creator' , userId)]
    );
    return posts.documents
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


export const signOut =async()=>{
  try {
    const session = await account.deleteSession("current")
    return session
  } catch (error) {
    throw new Error
  }
}