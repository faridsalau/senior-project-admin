export const fetchData = async (url: string) => {
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	const json = await res.json();
	return json;
};

export const setItem = (key: string, value: string) => {
	window.localStorage.setItem(key, value);
};

export const getItem = (key: string) => window.localStorage.getItem(key) || '';

export const removeItem = (key: string) => {
	window.localStorage.removeItem(key);
};

export const reload = () => {
	window.location.reload();
};
