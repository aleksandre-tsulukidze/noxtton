import React, { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button, InputLabel, Typography } from '@material-ui/core';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';
import ViewAgendaSharpIcon from '@material-ui/icons/ViewAgendaSharp';
import Spinner from './Spinner';
import '../css/Landing.css';
import { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  ulTabular: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  liTabular: {
    padding: '1rem',
    margin: '1rem',
    border: '1px solid rgb(226, 145, 113)',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: '18px',
    right: '5%',
    width: '30px',
    border: 'none',
    cursor: 'pointer',
  },
});

const Landing = () => {
  const classes = useStyles();
  const [repos, setRepos] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const deb = useCallback(
    debounce(data => {
      const queryString = 'q=' + encodeURIComponent(data.search);
      axios({
        method: 'GET',
        url: `https://api.github.com/search/repositories?${queryString}`,
      })
        .then(res => {
          setRepos(res.data.items), setLoading(false);
        })
        .catch(err => console.log(err));
    }, 1000),
    [],
  );

  const onSubmitHandler = data => {
    setLoading(true);
    deb(data);
  };

  return (
    <div className="form_wrapper">
      <form
        autoComplete="off"
        onSubmit={handleSubmit((data, e) => {
          onSubmitHandler(data);
          e.target.reset;
        })}>
        <InputLabel style={{ fontSize: '1.4rem' }} htmlFor="search">
          Enter Search Text
        </InputLabel>
        <Input
          required={true}
          style={{ fontSize: '1.4rem' }}
          type="text"
          id="search"
          {...register('search')}
        />
        <Button style={{ fontSize: '1.4rem' }} type="submit">
          Search
        </Button>
      </form>

      <button className={classes.button} onClick={() => setClicked(c => !c)}>
        {clicked ? (
          <AppsSharpIcon style={{ color: 'white', fontSize: '2.5rem' }} />
        ) : (
          <ViewAgendaSharpIcon style={{ color: 'white', fontSize: '2.5rem' }} />
        )}
      </button>
      <ul className={clicked ? classes.ulTabular : 'link'}>
        {!loading ? (
          repos.map(item => {
            return (
              <li
                key={item.id}
                className={clicked ? classes.liTabular : 'link_li'}>
                <Link
                  key={item.id}
                  className="link_link"
                  target="_blank"
                  to={'/detail/' + item.owner.login + '/' + item.name}>
                  <div>
                    <Typography variant="h3">repo: {item.name}</Typography>
                    <Typography variant="h4">
                      owner: {item.owner.login}
                    </Typography>
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
