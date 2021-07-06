import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Card from './Card';

const Detail = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(props);
    const repoName = encodeURIComponent(props.match.params.repoName);
    const username = encodeURIComponent(props.match.params.username);
    axios({
      method: 'GET',
      url: `https://api.github.com/repos/${username}/${repoName}`,
    })
      .then(res => {
        const tempArray = [];
        tempArray.push(res.data);
        return setData(tempArray);
      })
      .then(() => {
        setLoading(true);
      });
  }, [loading]);
  return <div>{loading ? <Card data={data} /> : <h1>LOADING</h1>}</div>;
};

Detail.propTypes = {
  item: propTypes.object,
  match: propTypes.object,
  name: propTypes.string,
};

export default Detail;
