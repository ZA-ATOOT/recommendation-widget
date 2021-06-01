const Widget = require('./components/Widget.js');

const App = async () => {
	try {
		const taboolaWidget = document.querySelector("#taboola-widget");

		if (!taboolaWidget) {
			throw new Error("No Widget Container");
		}

		const widget = new Widget({
			container: taboolaWidget,
			maxItems: 45,
			appType: "desktop",
			apiKey: "f9040ab1b9c802857aa783c469d0e0ff7e7366e4"
		});

		await widget.init(true);

	} catch (err) {
		console.log(err)
	}
}
document.addEventListener('DOMContentLoaded', () => {
	App();
});


