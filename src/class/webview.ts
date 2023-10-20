const GET_HTMLELEMENT_TIMEOUT_DEFAULT = 5000;

export class WebView{

	queryStrings: Record<string, unknown>;

	constructor(params:  Record<string, unknown>){

		this.queryStrings = params;

	}

	getHTMLElement(selector: string, timeout = GET_HTMLELEMENT_TIMEOUT_DEFAULT): Promise<HTMLElement>{

		return new Promise((resolve, reject) => {

			let wait = 0;
			let check: null | HTMLElement = document.querySelector(selector);

			if(check){

				resolve(check);

			}else{

				const loop     = 100;
				const interval = setInterval(() => {

					wait += loop;

					check = document.querySelector(selector);

					if(check){

						clearInterval(interval);
						resolve(check);

					}else if(wait > timeout){

						reject(new Error(`HTMLElement ${selector} not found after ${timeout}ms`));

					}

				}, loop);

			}

		});

	}

	checkElementsOverflow(){

		const REDUCE_FONT_SIZE = 3;

		const HTMLElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, button') as NodeListOf<HTMLElement>; // eslint-disable-line no-undef
		const keys         = Object.keys(HTMLElements);

		if(keys.length > 0){

			for(let key = 0; key < keys.length; key += 1){

				const element = HTMLElements[key];
				const pr      = window.getComputedStyle(element, null)?.getPropertyValue('padding-right');
				const fs      = window.getComputedStyle(element, null)?.getPropertyValue('font-size');
				const lh      = window.getComputedStyle(element, null)?.getPropertyValue('line-height');
				const btn     = element.classList.contains('btn-block');

				if((element.scrollWidth > element.offsetWidth)
				&& (element.scrollWidth > 0 && element.offsetWidth > 0)
				&& (element.scrollWidth - element.offsetWidth > 1)
				&& (pr && fs && lh)){

					const nfs = parseFloat(fs) - REDUCE_FONT_SIZE;

					element.style.transition = `color 500ms, font-size 500ms`;
					element.style.fontSize   = `${nfs}px`;

					const offset = btn ? element.offsetWidth - parseFloat(pr) : element.offsetWidth;
					const size   = (nfs * offset / element.scrollWidth) - 1;

					element.style.fontSize   = `${size}px`;
					element.style.lineHeight = lh;

				}

			}

		}

	}

	hexToRgbA(hexadecimal: string, opacity = 1): string | null{

		const BASE = 16;
		const HEX3 = 3;

		if((/^#(?<hexadecimal>[A-Fa-f0-9]{3}){1,2}$/gu).test(hexadecimal)){

			let hex = hexadecimal;

			const split = hex.substring(1).split('');

			if(split.length === HEX3){

				hex = `${split[0]}${split[0]}${split[1]}${split[1]}${split[2]}${split[2]}`;

			}

			const r = parseInt(hex.substring(0, 2), BASE);
			const g = parseInt(hex.substring(2, 4), BASE);
			const b = parseInt(hex.substring(4, 6), BASE);

			return`rgba(${r},${g},${b},${opacity})`;

		}

		return null;

	}

	getPropertyValue(variable: string){

		let css = variable;

		if(css.includes('--')){

			css = css.replace('var(', '').replace(')', '');
			css = window.getComputedStyle(document.body).getPropertyValue(css);

			if(css){

				css = css.replace(/(?<espace>[\s])/gu, '');

			}

		}

		return css;

	}

	checkImage(url: string, callback: any, callbackError: any, options = {interval: 0, maximum: 0}){

		const DEFAULT_INTERVAL  = 2000;
		const DEFAULT_MAX_TRIES = 3;

		const image    = new Image();
		const interval = options.interval && Number.isInteger(options.interval) ? options.interval : DEFAULT_INTERVAL;
		const maximum  = options.maximum && Number.isInteger(options.maximum) ? options.maximum : DEFAULT_MAX_TRIES;
		const message  = (a:string, b:number, c:number) => `Error: "${a}" doesn't exist (${b} / ${c} test(s)).`;

		let loaded  = false;
		let launch  = false;
		let tests   = 0;

		image.onload = () => {

			loaded = true;
			callback(image);

		};

		image.onerror = () => {

			const intervalLoadImage = setInterval(() => {

				tests += 1;

				if(tests <= maximum){

					image.onload = () => {

						if(!launch){

							loaded = true;
							launch = true;

							clearInterval(intervalLoadImage);
							callback(image);

						}

					};

					image.onerror = () => {

						if(tests > maximum && !launch){

							launch  = true;

							clearInterval(intervalLoadImage);
							callbackError(new Error(message(url, tests, maximum)));

						}

					};

				}else{

					clearInterval(intervalLoadImage);

					if(!loaded && !launch){

						callbackError(new Error(message(url, tests, maximum)));

					}

				}

			}, interval);

		};

		image.src         = url;
		image.crossOrigin = 'Anonymous';

	}

}
