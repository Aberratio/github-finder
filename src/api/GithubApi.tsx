import { getRepositoriesUrl, getUsersUrl } from "../components/tools/UrlBuilder";
import { ApiResponse, createGetRequestSender } from "./HttpHelper";

export interface GithubApi {
    fetchRepositories: (query: string) => Promise<ApiResponse>;
    fetchUsers: (query: string) => Promise<ApiResponse>;
}

export default function useGithubApi(): GithubApi {
    const fetchRepositories = (query: string) => {
        return createGetRequestSender()(
            getRepositoriesUrl(query)
        );
    };

    const fetchUsers = (query: string) => {
        return createGetRequestSender()(
            getUsersUrl(query)
        );
    };

    return {
        fetchRepositories,
        fetchUsers
    }
}