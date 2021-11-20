import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDn4Tx6ASgb2Lvd6OvoxQ8Dw5YfpRoFg2Q',
	authDomain: 'senior-project-3f6df.firebaseapp.com',
	projectId: 'senior-project-3f6df',
	storageBucket: 'senior-project-3f6df.appspot.com',
	messagingSenderId: '377854949040',
	appId: '1:377854949040:web:9fec93f6a34615cce22d75'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
