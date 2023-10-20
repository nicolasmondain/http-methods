import {EventEngineServer} from '../@types/event-engine';
import {httpResponse} from '@sharingbox/http-status/src/@types/http-status/index';
import {Server} from './server';

import apiHttpMethods from '../api/api-http';

export class Api extends Server{

	constructor(server: EventEngineServer){

		super('Api', server);

	}

	async getPreFormAll(): Promise<httpResponse>{

		const getPreFormAll = await apiHttpMethods.getPreFormAll(this);

		this.httpResponseCheck(getPreFormAll);

		return getPreFormAll;

	}

	async getPreForm(idSession: string, token: string): Promise<httpResponse>{

		const getPreForm = await apiHttpMethods.getPreForm(this, idSession, token);

		this.httpResponseCheck(getPreForm);

		return getPreForm;

	}

	async deletePreForm(idSession: string, token: string): Promise<httpResponse>{

		const deletePreForm = await apiHttpMethods.deletePreForm(this, idSession, token);

		this.httpResponseCheck(deletePreForm);

		return deletePreForm;

	}

	async updatePreForm(idSession: string, token: string, data: Record<string, unknown>): Promise<httpResponse>{

		const updatePreForm = await apiHttpMethods.updatePreForm(this, idSession, token, data);

		this.httpResponseCheck(updatePreForm);

		return updatePreForm;

	}

}
