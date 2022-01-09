import { RepositoryDto } from "../dto/RepositoryDto";
import { UserDto } from "../dto/UserDto";
import { ResultDetails } from "../interfaces/ResultDetails";
import { ResultType } from "../interfaces/ResultType";

export const mapUsersIntoResult = (users: UserDto[]) => {
    return users.map(user => {
      return {
        name: user.login,
        id: user.id,
        url: user.html_url,
        type: ResultType.USER
      }
    })
  };

export const mapRepositoriesIntoResult = (repos: RepositoryDto[]) => {
    return repos.map(repo => {
      return {
        name: repo.name,
        id: repo.id,
        url: repo.html_url,
        type: ResultType.RESPOSITORY
      } as ResultDetails
    })
  };