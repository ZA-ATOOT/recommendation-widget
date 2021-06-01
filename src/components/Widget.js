const WidgetUI = require('./WidgetUI.js');
const { fetchData, createQuery, newElement } = require('../utils.js');

module.exports = class Widget {
	constructor({ container, maxItems, appType, apiKey, sourceType }) {
		this.container = container;
		this.maxItems = maxItems;
		this.itemsCount = 0;
		this.apiUrl = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get";
		this.appType = appType || "desktop";
		this.apiKey = apiKey || "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
		this.sourceType = sourceType || "video";
		this.sourceId = 214321562187;
		this.sourceUrl = "http://www.site.com/videos/214321562187.html";
		this.url = this.createUrl();
		this.WidgetUI = new WidgetUI(this.container)
		this.WidgetUI.setUpWrapper()
	}

	async init(setInfiniteScroll) {
		try {
			await this.setWidget(10);
			if(setInfiniteScroll){
				this.setInfiniteScroll()
			}
		} catch (err) {
			this.onError(err);
		}
	}

	createUrl() {
		return `${this.apiUrl}?${createQuery({
			"app.type": this.appType,
			"app.apikey": this.apiKey,
			"source.type": this.sourceType,
			"source.id": this.sourceId,
			"source.url": this.sourceUrl
		})}`
	}

	async setWidget(items) {
		try {
			this.itemsCount += items;
			if (this.itemsCount >= this.maxItems) {
				this.itemsCount = this.maxItems;
				this.stopInfiniteScroll()
			}

			this.data = await this.getWidgetItems(this.itemsCount);
			const list = this.getPortionOfList(this.itemsCount- items, this.itemsCount);


			if (this.data.list.length < this.itemsCount) {
				this.stopInfiniteScroll()
			}

			this.updateWidget(list, true)
		} catch (err) {
			this.onError(err);
		}
	}

	async getWidgetItems(items) {
		return await fetchData(`${this.url}&count=${items}`, 'json');
	}

	getPortionOfList(from, to) {
		return this.data.list.slice(from, to);
	}

	async updateWidget(list) {
		await this.WidgetUI.updateWidget(list,true)
	}


	setInfiniteScroll() {
		try {
			this.lastItem = newElement({ name: "div", id: "last-item" });
			this.container.appendChild(this.lastItem);

			this.observer = new IntersectionObserver(async (entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					await this.setWidget(10);
				}
			}, { rootMargin: '0px', threshold: 1.0 });

			this.observer.observe(this.lastItem);
		} catch (err) {
			this.onError(err)
		}
	}

	stopInfiniteScroll() {
		if (this.observer) {
			this.observer.unobserve(this.lastItem);
		}
	}

	onError(err) {
		this.stopInfiniteScroll()
		throw new Error(err)
	}
}