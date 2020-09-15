import React from 'react';
import PropTypes from 'prop-types'

const Input = ({ type, placeHolder, autoComplete, leftIcon, rightIcon, onChange, value, onRightIconClick }) => (
  <span className="input">
    <i className={leftIcon} aria-hidden="true"></i>
    <input autoFocus type={type} name={placeHolder}
      autoComplete={autoComplete}
      placeholder={placeHolder}
      onChange={onChange}
      value={value} />
    <i className={rightIcon} aria-hidden="true" onClick={onRightIconClick}></i>
  </span>
);

Input.defaultProps = {
  type: "text",
  placeHolder: "Input",
  autoComplete: "on"
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onRightIconClick: PropTypes.func
};

export default Input;