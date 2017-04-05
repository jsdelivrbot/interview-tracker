import React from 'react';

export default (props) => {
  return (
    <div className={`section-header ${props.className}`}>
      {props.text}
    </div>
  );
}
