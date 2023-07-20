import { initializeApp } from 'firebase/app';
import * as database from 'firebase/database'
import { getDatabase, ref } from 'firebase/database';
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey : "AIzaSyD0YrNl2KoXCg7UWgQ0UWvZMgZbYWC4LvA",
    authDomain : "artrise-ffe4c.firebaseapp.com",
    databaseURL : "https://artrise-ffe4c-default-rtdb.firebaseio.com",
    projectId : "artrise-ffe4c",
    storageBucket : "artrise-ffe4c.appspot.com",
    messagingSenderId : "421726137664",
    appId : "1:421726137664:web:5b0a9fdb689b57283edea5",
    measurementId : "G-3G23MJFCL0"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

const auth = getAuth(app)


export default auth;


