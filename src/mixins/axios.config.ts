import {AxiosRequestConfig} from 'axios/index';

const MIN_STATUS_CODE = 500;

const axiosConfig: AxiosRequestConfig = {

	headers       : {'content-type': 'application/x-www-form-urlencoded'},
	validateStatus: (status) => status < MIN_STATUS_CODE

};

export default axiosConfig;
