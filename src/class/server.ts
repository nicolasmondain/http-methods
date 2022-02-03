import {EventEngineServer, EventEngineServerExpectations} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';

import httpStatus from '@sharingbox/http-status/dist/browser';

export class Server {

	server  : string;
	port    : number;
	protocol: string;
	url     : string;

	constructor(options: EventEngineServer){

		this.server   = options.server;
		this.port     = options.port;
		this.protocol = options.protocol;
		this.url      = options.server === 'localhost' ? `${options.protocol}://${options.server}:${options.port}` : `${options.protocol}://${options.server}`;

	}

	static httpResponseCheck(response: httpResponse): void{

		if(!httpStatus.isSuccess(response.status) && !httpStatus.isImateapot(response.status)){

			throw new Error(JSON.stringify(response));

		}

	}

	static httpResponsesCheck(responses: Array<httpResponse>): void{

		if(!responses.every((r) => httpStatus.isSuccess(r.status) || httpStatus.isImateapot(r.status))){

			throw new Error(JSON.stringify(responses.find((r) => !httpStatus.isSuccess(r.status) && !httpStatus.isImateapot(r.status))));

		}

	}

	recall(method: (...args: any) => Promise<httpResponse>, args: Array<unknown>, expect: EventEngineServerExpectations): Promise<httpResponse>{ // eslint-disable-line no-unused-vars, max-lines-per-function

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

							}else if(count >= RECALL_MAX){

								clearInterval(interval);
								reject(new Error(JSON.stringify(response)));

							}else{

								status = RECALL_ANSWERED;

							}

						})
						.catch((error) => {

							clearInterval(interval);
							reject(error);

						});

					}catch(error){

						clearInterval(interval);
						reject(error);

					}

				}

			}, RECALL_DELAY);

		});

	}

	async multiplecall(method: (...args: any) => Promise<httpResponse>, args: Array<Array<unknown>>): Promise<Array<unknown>>{ // eslint-disable-line no-unused-vars

		const multiplecall = await Promise.all(args.map((arg) => method.bind(this)(...arg)));

		Server.httpResponsesCheck(multiplecall);

		return multiplecall;

	}

}
