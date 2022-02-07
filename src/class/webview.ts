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

}
