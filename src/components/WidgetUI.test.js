const { fetchData } = require("../utils");
const WidgetUI = require('./WidgetUI');
const { expect } = require("@jest/globals");

describe("WidgetUI", () => {
	beforeEach(() => {
		fetchMock.doMock()
		fetch.once(JSON.stringify(response));
	})


	document.body.innerHTML = `<div id="taboola-widget"></div>`;
	const container = document.querySelector("#taboola-widget");

	const widgetUI = new WidgetUI(container);


	it("Create and append the widget wrapper", () => {
		widgetUI.setUpWrapper()
		expect(widgetUI.container.innerHTML).toEqual('<div id="widget-wrapper"></div>')
	})

	it("create items an append to wrapper", async () => {
		const data = await fetchData("http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&source.type=video&source.id=214321562187&source.url=http://www.site.com/videos/214321562187.html&count=10")	
		await widgetUI.updateWidget(data.list)
		expect(widgetUI.widgetWrapper.childElementCount).toBe(10)
		// console.log(widgetUI.widgetWrapper.childElementCount)
	})
})