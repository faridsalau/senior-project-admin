import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { onAuthStateChanged, sendSignInLinkToEmail } from 'firebase/auth';
import { auth, db } from './firebase';
import type { User } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from '@firebase/firestore';
import useAuthRedirect from './useAuthRedirect';

type Auth = {
	user: User | null;
	known: boolean;
};

const actionCodeSettings = {
	url: 'http://localhost:3000/',
	handleCodeInApp: true
};

const authContext = () => {
	const { subscribe, set } = writable<Auth>({
		user: null,
		known: false
	});

	const listen = async () => {
		onAuthStateChanged(auth, (user) => {
			set({
				user,
				known: true
			});
			useAuthRedirect(user);
		}),
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
		set({ user: null, known: true });
	}

	return {
		subscribe,
		sendSignInEmail,
		createAdminEntry,
		listen
	};
};

export const authProvider = authContext();
