import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { onAuthStateChanged, sendSignInLinkToEmail } from 'firebase/auth';
import { auth, db } from './firebase';
import type { User } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from '@firebase/firestore';

type Auth = {
	user: User | null;
	known: boolean;
	isBrowser: boolean;
};

const key = 'emailForSignInAdmin';

const actionCodeSettings = {
	url: 'http://localhost:3000/',
	handleCodeInApp: true
};

const authContext = () => {
	const { subscribe, set } = writable<Auth>({
		user: null,
		known: false,
		isBrowser: false
	});

	const listen = async () => {
		onAuthStateChanged(auth, (user) =>
			set({
				user,
				known: true,
				isBrowser: true
			})
		),
			(err) => console.error(err.message);
	};

	const createAdminEntry = async (email: string) => {
		const adminsRef = collection(db, 'admins');
		await setDoc(doc(adminsRef, email), { email });
	};

	const hasAdminEntry = async (email: string) => {
		const adminsRef = doc(db, 'admins', email);
		const docSnap = await getDoc(adminsRef);
		return docSnap.exists();
	};

	const sendSignInEmail = async (email: string) => {
		if (await hasAdminEntry(email)) {
			await sendSignInLinkToEmail(auth, email, actionCodeSettings);
			return true;
		} else {
			return false;
		}
	};

	if (browser) {
		listen();
	} else {
		set({ user: null, known: true, isBrowser: false });
	}

	return {
		subscribe,
		sendSignInEmail,
		createAdminEntry
	};
};

export const authProvider = authContext();
