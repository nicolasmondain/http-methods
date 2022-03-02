import {AxiosRequestConfig} from 'axios';

const axiosConfig: AxiosRequestConfig = {

	headers       : {'content-type': 'application/x-www-form-urlencoded'},
	validateStatus: () => true

};

export default axiosConfig;
