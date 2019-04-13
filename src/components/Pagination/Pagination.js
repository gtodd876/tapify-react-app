import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

const Pagination = ({ className }) => <div className={'page' + className} />;

Pagination.propTypes = {
  className: PropTypes.string
};

export default Pagination;
