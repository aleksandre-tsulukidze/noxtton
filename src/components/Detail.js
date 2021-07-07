import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Spinner from './Spinner';
import Card from './UserCard';

const Detail = props => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const repoName = encodeURIComponent(props.match.params.repoName);
    const username = encodeURIComponent(props.match.params.username);
    axios({
      method: 'GET',
      url: `https://api.github.com/repos/${username}/${repoName}`,
    })
      .then(res => {
        return setData(res.data);
      })
      .then(() => {
        setLoading(true);
      });
  }, [loading]);
  return <div>{loading ? <Card data={data} /> : <Spinner />}</div>;
};

Detail.propTypes = {
  item: propTypes.object,
  match: propTypes.object,
  name: propTypes.string,
};

export default Detail;
