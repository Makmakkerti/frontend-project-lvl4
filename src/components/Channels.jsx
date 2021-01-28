/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cn from 'classnames';

const Channels = ({ data }) => {
  const { channels, currentChannelId } = data;

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((c) => {
          const buttonStatus = c.id === currentChannelId ? 'primary' : 'light';
          const classes = cn(
            'nav-link',
            'btn-block',
            'mb-2',
            'text-left',
            'btn',
            {
              [`btn-${buttonStatus}`]: true,
            },
          );

          return (
            <li className="nav-item" key={c.id}>
              <button type="button" className={classes}>{c.name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
