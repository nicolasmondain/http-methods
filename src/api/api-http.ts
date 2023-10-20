import {httpMethodsModule} from '../@types/http-methods';

import apiHttpPreform from './api-http-preform';

const apiHttp: httpMethodsModule = {};

export default Object.assign(apiHttp, apiHttpPreform);
