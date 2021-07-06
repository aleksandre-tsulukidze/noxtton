import React from 'react';
import propTypes from 'prop-types';

const Card = ({ data }) => {
  return (
    <>
      <h1>{data[0].owner.login}</h1>
      <img src={data[0].owner.avatar_url} alt="" />
    </>
  );
};

Card.propTypes = {
  data: propTypes.array,
};

export default Card;
