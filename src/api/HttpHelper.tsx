import axios, { AxiosResponse } from 'axios';

export interface ApiResponse {
    statusCode?: number;
    data?: any;
    error?: string;
}

export const createRequestConfig = (contentType?: string) => {
    const headers: any = {};
    if (contentType) {
        headers['Accept'] = contentType;
    }
    return { headers: headers }
};

export const handleAxiosError = (response: ApiResponse, error: any) => {
    if (error.response) {
        response.statusCode = error.response.status;
        response.data = error.response.data;
    }
};

async function handleAxiosRequest(axiosResponse: Promise<AxiosResponse<any>>) {
    const response: ApiResponse = {};

    await axiosResponse
        .then(res => {
            response.statusCode = res.status;
            response.data = res.data;
        })
        .catch(error => handleAxiosError(response, error));
    return response;
}

export const createGetRequestSender = () => {
    return async (url: string, contentType?: string): Promise<ApiResponse> => {
        return new Promise(resolve => {
            const requestConfig = createRequestConfig(contentType);
            const response = handleAxiosRequest(axios.get(url, requestConfig));
            return resolve(response);
        });
    };
};