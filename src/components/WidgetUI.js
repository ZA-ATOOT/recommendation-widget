const { newElement, imgLoad } = require('../utils.js');

module.exports = class WidgetUI {
	constructor(container) {
		this.container = container;
	}

	setUpWrapper() {
		this.widgetWrapper = newElement({ name: "div", id: "widget-wrapper" });
		this.container.appendChild(this.widgetWrapper);
	}

	async updateWidget(list, checkImg) {
		try {
			let figure = newElement({ name: "figure", className: "Item" });
			let documentFragment = document.createDocumentFragment();
			for (const v of list) {
				try {
					if (checkImg) {
						await imgLoad(v.thumbnail[0].url, 2000);
					}

					let cloneFigure = figure.cloneNode(true);
					cloneFigure.innerHTML = this.createItem({ ...v })
					documentFragment.appendChild(cloneFigure);
				} catch (error) {
					console.log(error)
				}
			}

			this.widgetWrapper.appendChild(documentFragment);
		} catch (err) {
			this.onError(err)
		}
	}

	createItem({ thumbnail, name, url, branding }) {
		return `
			<a href="${url}" target="_blank">
				<span class="img" style="background-image: url(${thumbnail[0].url})"></span>
				${name ? `<figcaption>${name}</figcaption>` : ""}
				${branding ? `<figcaption class="sponsored"><strong>${branding}</strong> | Sponsored </figcaption>` : ""}
			</a>
				`
	}

	onError(err) {
		throw new Error(err)
	}
}