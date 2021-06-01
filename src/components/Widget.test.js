const Widget = require('./Widget');
describe("Widget", () => {

	beforeEach(() => {
		fetchMock.doMock()
		fetch.once(JSON.stringify(response));
	})

	document.body.innerHTML = `<div id="taboola-widget"></div>`;

	const container = document.querySelector("#taboola-widget");
	const widget = new Widget({
		container,
		maxItems: 45,
		appType: "desktop",
		apiKey: "f9040ab1b9c802857aa783c469d0e0ff7e7366e4"
	});

	it("should init the Widget", () => {
		expect(widget.maxItems).toBe(45)
		expect(widget.itemsCount).toBe(0)
		expect(widget.apiKey).toBe("f9040ab1b9c802857aa783c469d0e0ff7e7366e4")
		expect(widget.url).toBe("http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&source.type=video&source.id=214321562187&source.url=http://www.site.com/videos/214321562187.html")
	})


	it("set first 10 items", async ()=>{
		await widget.init()

		const list = widget.data.list;
		expect(list.length).toBe(10)
	})

	// it("dd", ()=>{
	// 	widget.setWidget(10)
	// })

	it("should fetch 10 items", async () => {
		const data = await widget.getWidgetItems(10)
		expect(data.list.length).toBe(10);
	})
	
	it("should slice and return 5 items", async () => {
		const data = await widget.getWidgetItems(10)
		widget.data = data;
		const list = widget.getPortionOfList(0,5)
		
		expect(list.length).toBe(5);
	})

	
})