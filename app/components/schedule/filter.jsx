import React from 'react';

export default function Filter(props) {
    const {value} = props;

    return (
      <option>{value}</option>
    );
}

Filter.propTypes = {
    value: React.PropTypes.string.isRequired,
};
