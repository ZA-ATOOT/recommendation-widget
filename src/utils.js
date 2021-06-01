const fetchData = async (url, type = "json") => {
	try {
		const res = await fetch(url);
		return await res[type]();
	} catch (error) {
		console.log(error);
	}

}

const newElement = ({ name, id, className, events }) => {
	const el = document.createElement(name);
	id && (el.id = id);
	className && (el.className = className);

	events && events.forEach(({ eventName, handler }) => {
		el.addEventListener(eventName, handler)
	});
	return el
}

const createQuery = params => {
	return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

const imgLoad = (src, ms) => {
	return new Promise((resolve, reject) => {
		let id = setTimeout(() => {
			clearTimeout(id);
			reject()
		}, ms)

		let img = new Image()
		img.onload = () => resolve(img)
		img.onerror = () => reject()
		img.src = src
	})
}

module.exports = {
	fetchData,
	newElement,
	createQuery,
	imgLoad
}