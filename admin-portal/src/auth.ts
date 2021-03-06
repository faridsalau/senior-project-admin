import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { onAuthStateChanged, sendSignInLinkToEmail } from 'firebase/auth';
import { auth, db } from './firebase';
import type { User } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@firebase/firestore';
import hash from 'object-hash';
import useAuthRedirect from './useAuthRedirect';
import type { Reward } from './types';
import { query, where } from 'firebase/firestore';

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

	// const addEvents = async () => {
	// 	const eventsRef = collection(db, 'events');
	// 	const events = [
	// 		{
	// 			title: 'STOMP',
	// 			url: 'https://events.olemiss.edu/event.php?value=000000033540',
	// 			month: 'Nov',
	// 			day: '29'
	// 		},
	// 		{
	// 			title: 'Postmodern Jukebox',
	// 			url: 'https://events.olemiss.edu/event.php?value=000000033548',
	// 			month: 'Dec',
	// 			day: '4'
	// 		}
	// 	];
	// 	const ret = [];
	// 	for (let i = 0; i < events.length; ++i) {
	// 		const id = hash(events[i]);
	// 		const obj = {
	// 			...events[i],
	// 			id,
	// 			points: 500,
	// 			active: true,
	// 			attendance: 0
	// 		};
	// 		await setDoc(doc(eventsRef, id), obj);
	// 	}
	// };

	const hasAdminEntry = async (email: string) => {
		const adminsRef = doc(db, 'admins', email);
		const docSnap = await getDoc(adminsRef);
		return docSnap.exists();
	};

	const fetchEvents = async () => {
		return await getDocs(collection(db, 'events'));
	};

	const fetchRewards = async () => {
		return await getDocs(collection(db, 'rewards'));
	};

	const fetchUsers = async () => {
		const usersRes = await getDocs(collection(db, 'users'));
		const users = [];
		usersRes.forEach((user) => {
			const name = user.data().firstName + ' ' + user.data().lastName;
			users.push({ name, email: user.id, hash: user.data().hash });
		});
		return users;
	};

	const fetchUser = async (hash: string) => {
		const usersRef = collection(db, 'users');
		const q = query(usersRef, where('hash', '==', hash));
		const data = await getDocs(q);
		if (!Boolean(data.docs.length)) {
			return false;
		}
		return data.docs[0];
	};

	const fetchAttendees = async (eventId: string) => {
		try {
			const usersRef = collection(db, 'users');
			const q = query(usersRef, where('eventsAttended', 'array-contains', eventId));
			const data = await getDocs(q);
			if (!Boolean(data.docs.length)) {
				return false;
			}
			return data.docs;
		} catch {
			alert('Something went wrong, please try again');
		}
	};

	const deleteReward = async (rewardId: string) => {
		try {
			await deleteDoc(doc(db, 'rewards', rewardId));
		} catch {
			alert('Something went wrong, please try again');
		}
	};

	const updateEventPoints = async (id: string, points: number) => {
		const eventRef = doc(db, 'events', id);
		const docSnap = await getDoc(eventRef);
		if (!docSnap.exists()) {
			return false;
		}
		await setDoc(eventRef, { points }, { merge: true });
		return true;
	};

	const updateReward = async (id: string, newData: any) => {
		const rewardsRef = doc(db, 'rewards', id);
		const docSnap = await getDoc(rewardsRef);
		if (!docSnap.exists()) {
			return false;
		}
		await setDoc(rewardsRef, newData, { merge: true });
		return true;
	};

	// TODO: check if reward exists and update with new values
	const createReward = async (reward: Reward) => {
		const id = hash(reward.name.toLowerCase().trim());
		const rewardsRef = collection(db, 'rewards');
		try {
			await setDoc(doc(rewardsRef, id), {
				id,
				...reward
			});
			return true;
		} catch {
			return false;
		}
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
		listen,
		fetchEvents,
		fetchUsers,
		fetchUser,
		fetchRewards,
		fetchAttendees,
		deleteReward,
		updateEventPoints,
		updateReward,
		createReward
	};
};

export const authProvider = authContext();
