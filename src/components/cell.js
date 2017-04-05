import React from 'react';

export default (props) => {

  return (
    <div className="cell">
      <div className="flex flex-space-around">
        <span className="cell-title">{props.title}</span>
        <span className="cell-right-detail-text mla">{props.rightDetailText}</span>
      </div>
      <div className="flex flex-space-around">
        <span className="cell-subtitle">{props.subtitle}</span>
      </div>
      {props.children}
    </div>
  );
}
