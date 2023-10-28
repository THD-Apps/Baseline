import db from '$lib/server/db';

export async function load() {
	return db('messages')
		.select()
		.then((data) => {
			return {
				results: data,
				error: null
			};
		})
		.catch((error) => {
			return {
				results: null,
				error: error
			};
		});
}
