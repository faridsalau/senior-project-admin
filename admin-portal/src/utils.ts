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
