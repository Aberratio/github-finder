import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/ui/Header';
import { UserDto } from './components/dto/UserDto';
import { RepositoryDto } from './components/dto/RepositoryDto';
import { ResultDetails } from './components/interfaces/ResultDetails';
import useGithubApi from './api/GithubApi';
import ResultList from './components/models/ResultList';
import { makeStyles } from '@mui/styles';
import { EMPTY_STRING, EMPTY_TABLE, MIN_CHARS_NUMBER_TO_INITIALIZE_SEARCH, RESULT_LIMIT } from './components/global/consts';
import { StatusCode } from './components/interfaces/StatusCode';
import { mapRepositoriesIntoResult, mapUsersIntoResult } from './components/tools/Mapper';

const useStyles = makeStyles({
  errorContainer: {
    width: '580px',
    margin: 'auto',
    marginTop: '20px',
    background: '#e99f9f',
    borderRadius: '5px',
    padding: '10px',
  },
});

const App = () => {
  const classes = useStyles();
  const githubApi = useGithubApi();

  const [resultObjects, setResultObjects] = useState<ResultDetails[]>(EMPTY_TABLE);
  const [repositories, setRepositories] = useState<RepositoryDto[]>(EMPTY_TABLE);
  const [users, setUsers] = useState<UserDto[]>(EMPTY_TABLE);
  const [query, setQuery] = useState<string>(EMPTY_STRING);
  const [error, setError] = useState<string>(EMPTY_STRING);

  useEffect(() => {
    if (query.length >= MIN_CHARS_NUMBER_TO_INITIALIZE_SEARCH) {
      fetchData();
    } else {
      setResultObjects(EMPTY_TABLE);
    }
  }, [query]);

  useEffect(() => {
    if (repositories && users) {
      const resultObjects = mapRepositoriesIntoResult(repositories).concat(mapUsersIntoResult(users)).sort((a, b) => a.name.localeCompare(b.name));
      setResultObjects(resultObjects.slice(0, RESULT_LIMIT));
      if (resultObjects.length > 0) {
        setError(EMPTY_STRING);
      }
    }
  }, [repositories, users]);

  const fetchData = () => {
    githubApi.fetchRepositories(query)
      .then(response => {
        if (response.statusCode === StatusCode.OK) {
          setRepositories(response.data.items?.map((repo: RepositoryDto) => {
            return {
              name: repo.name,
              id: repo.id,
              html_url: repo.html_url
            }
          }));
        } else {
          setRepositories(EMPTY_TABLE);
          setError(response.data.message);
        }
      })

    githubApi.fetchUsers(query)
      .then(response => {
        if (response.statusCode === StatusCode.OK) {
          setUsers(response.data.items?.map((user: UserDto) => {
            return {
              login: user.login,
              id: user.id,
              html_url: user.html_url
            }
          }));
        } else {
          setUsers(EMPTY_TABLE);
          setError(response.data.message);
        }
      })
  };

  const handleSearchParamsChange = (value: string) => {
    setQuery(value);
  };

  const errorBox = () => {
    if (error && error.length > 0) {
      return <div className={classes.errorContainer}>
      {error}
    </div>
    }
  };

  return (
    <>
      <Header />
      {errorBox()}
      {resultObjects && <ResultList items={resultObjects} query={query} handleSearchParamsChange={handleSearchParamsChange} />}
    </>
  );
}

export default App;
