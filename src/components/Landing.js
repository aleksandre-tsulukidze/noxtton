import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button, InputLabel, Typography } from '@material-ui/core';
import Spinner from './Spinner';
import '../css/Landing.css';

const Landing = () => {
  // eslint-disable-next-line no-unused-vars
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = data => {
    setLoading(true);
    const queryString = 'q=' + encodeURIComponent(data.search);
    axios({
      method: 'GET',
      url: `https://api.github.com/search/repositories?${queryString}`,
    })
      .then(res => {
        setRepos(res.data.items), setLoading(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form_wrapper">
      <form
        onSubmit={handleSubmit((data, e) => {
          onSubmitHandler(data);
          e.target.reset;
        })}>
        <InputLabel htmlFor="search">Enter Search Text</InputLabel>
        <Input
          type="text"
          id="search"
          {...register('search', { required: 'This is required.' })}
        />
        {errors.search && <Typography>{errors.search.message}</Typography>}
        <Button type="submit">Search</Button>
      </form>
      <ul className="link">
        {!loading ? (
          repos.map(item => {
            return (
              <li key={item.id} className="link_li">
                <Link
                  key={item.id}
                  className="link_link"
                  target="_blank"
                  to={'/detail/' + item.owner.login + '/' + item.name}>
                  <div>
                    <h1>repo: {item.name}</h1>
                    <h2>owner: {item.owner.login}</h2>
                  </div>
                </Link>
              </li>
            );
          })
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
};

export default Landing;
