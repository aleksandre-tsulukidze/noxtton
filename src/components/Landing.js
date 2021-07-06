import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button, InputLabel, Typography } from '@material-ui/core';
import '../css/Landing.css';

const Landing = () => {
  // eslint-disable-next-line no-unused-vars
  const [repos, setRepos] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = data => {
    const queryString = 'q=' + encodeURIComponent(data.search);
    axios({
      method: 'GET',
      url: `https://api.github.com/search/repositories?${queryString}`,
    }).then(res => setRepos(res.data.items));
  };

  //   const onClickHandler = item => {
  //     console.log(item);
  //   };
  return (
    <div className="form-wrapper">
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
      {repos.map(item => {
        return (
          <Link
            key={item.id}
            to={'/detail/' + item.owner.login + '/' + item.name}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Landing;
