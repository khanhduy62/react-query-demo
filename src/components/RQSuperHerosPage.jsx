import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

const fetchSuperHeroes = (id) =>
  axios.get(`http://localhost:4000/superheroes/${id}`);

const RQSuperHeroesPage = () => {
  const [id, setId] = useState('');
  const { isLoading, data, error, isError, isFetching } = useQuery(
    ['super-heroes', id],
    () => fetchSuperHeroes(id),
    { retry: 0, refetchOnMount: false }
  );

  console.log({ isFetching, isLoading, data });

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {isLoading && <h2>Loading...</h2>}
      <input onChange={(e) => setId(e.nativeEvent.target.value)} />
      {data?.data ? (
        Array.isArray(data.data) ? (
          data?.data?.map((hero) => {
            return <div key={hero.name}>{hero.name}</div>;
          })
        ) : (
          <div>{data.data.name}</div>
        )
      ) : null}
    </>
  );
};

export default RQSuperHeroesPage;