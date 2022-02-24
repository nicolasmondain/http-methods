
import {EventEngineServer, EventEngineServerExpectations, EventEngineServerType} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import httpStatus from '@sharingbox/http-status/dist/browser';

export class Server {

	type    : string;
	server  : string;
	port    : number;
	protocol: string;
	url     : string;

	constructor(type: EventEngineServerType, options: EventEngineServer){

		this.type     = type;
		this.server   = options.server;
		this.port     = options.port;
		this.protocol = options.protocol;
		this.url      = options.server === 'localhost' ? `${options.protocol}://${options.server}:${options.port}` : `${options.protocol}://${options.server}`;

	}

	httpResponseSource(source?: string): string{

		let httpResponseSource = '';

		if(source && this.type){

			httpResponseSource = `${source}-${this.type}`.toUpperCase();

		}

		return httpResponseSource;

	}

	httpResponseCheck(response: httpResponse): void{

		if(!httpStatus.isSuccess(response.status) && !httpStatus.isImateapot(response.status)){

			response.source = this.httpResponseSource(response.source);

			throw new Error(JSON.stringify(response));

		}

	}

	httpResponsesCheck(responses: Array<httpResponse>): void{

		if(!responses.every((r) => httpStatus.isSuccess(r.status) || httpStatus.isImateapot(r.status))){

			const response = responses.find((r) => !httpStatus.isSuccess(r.status) && !httpStatus.isImateapot(r.status));

			if(response){

				response.source = this.httpResponseSource(response.source);

				throw new Error(JSON.stringify(response));

			}

		}

	}

	recall(method: (...args: any) => Promise<httpResponse>, args: Array<unknown>, expect: EventEngineServerExpectations, options?: {delay: number, max: number}): Promise<httpResponse>{ // eslint-disable-line no-unused-vars, max-lines-per-function

		const RECALL_DELAY    = 250;
		const RECALL_MAX      = 50;
		const RECALL_INIT     = 0;
		const RECALL_ASKED    = 1;
		const RECALL_ANSWERED = 2;

		let count  = 0;
		let status = RECALL_INIT;

		return new Promise((resolve, reject) => {

			const interval = setInterval(() => {

				if(status === RECALL_INIT || status === RECALL_ANSWERED){

					count += 1;
					status = RECALL_ASKED;

					try{

						method.bind(this)(...args)
						.then((response) => {

							const checkResponseData = httpStatus.checkResponseData(response);

							const expectations = expect
																	.map((e) => checkResponseData.expect(e.nested)[e.method](e.compare) && e.status === response.status)
																	.every((e) => e === true);

							if(expectations){

								clearInterval(interval);
								resolve(response);

							}else if(count >= (options?.max || RECALL_MAX)){

								clearInterval(interval);
								reject(new Error(JSON.stringify(response)));

							}else{

								status = RECALL_ANSWERED;

							}

						})
						.catch((error) => {

							if(count >= (options?.max || RECALL_MAX)){

								clearInterval(interval);
								reject(error);

							}else{

								status = RECALL_ANSWERED;

							}

						});

					}catch(error){

						clearInterval(interval);
						reject(error);

					}

				}

			}, options?.delay || RECALL_DELAY);

		});

	}

	async multiplecall(method: (...args: any) => Promise<httpResponse>, args: Array<Array<unknown>>): Promise<Array<unknown>>{ // eslint-disable-line no-unused-vars

		const multiplecall = await Promise.all(args.map((arg) => method.bind(this)(...arg)));

		this.httpResponsesCheck(multiplecall);

		return multiplecall;

	}

}
