import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import type { User } from 'firebase/auth';

type Auth = {
	user: User | null;
	known: boolean;
};

const authContext = () => {
	const { subscribe, set } = writable<Auth>({
		user: null,
		known: false
	});

	const listen = async () => {
		onAuthStateChanged(auth, (user) =>
			set({
				user,
				known: true
			})
		),
			(err) => console.error(err.message);
	};

	if (browser) {
		listen();
	} else {
		set({ user: null, known: true });
	}

	return {
		subscribe
	};
};

export const authProvider = authContext();
