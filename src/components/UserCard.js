import React from 'react';
import propTypes from 'prop-types';
import { Card, CardMedia, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  default: {
    padding: 25,
  },
  image: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 10,
  },
  link: {
    marginBottom: 30,
  },
  root: {
    maxWidth: '70%',
    margin: '30px auto',
    padding: 15,
  },
});

const UserCard = ({ data }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography
        color="rgb(226, 145, 113)"
        className={classes.default}
        variant="h4">
        User
      </Typography>
      <Typography variant="h2" className={classes.default}>
        {data.owner.login}
      </Typography>
      <CardMedia className={classes.default}>
        <img src={data.owner.avatar_url}></img>
      </CardMedia>
      <Typography
        color="rgb(226, 145, 113)"
        className={classes.default}
        variant="h4">
        User Github Account
      </Typography>
      <Link
        className={classes.default}
        href={data.owner.html_url}
        rel="noreferrer"
        target="_blank">
        {data.owner.html_url}
      </Link>
      <Typography
        color="rgb(226, 145, 113)"
        className={classes.default}
        variant="h4">
        Repo Description
      </Typography>
      <Typography className={classes.default} variant="h4">
        {data.description}
      </Typography>
      <Typography
        color="rgb(226, 145, 113)"
        className={classes.default}
        variant="h4">
        Repo Url
      </Typography>
      <Link
        className={classes.link}
        href={data.html_url}
        target="_blank"
        rel="noreferrer">
        {data.html_url}
      </Link>
    </Card>
  );
};

UserCard.propTypes = {
  data: propTypes.object,
};

export default UserCard;
