/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { selectChannel } from '../store/currentChannel';
import { openModal } from '../store/modal';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
    channels: state.channels,
  };
  return props;
};

const Channels = (props) => {
  const { channels, currentChannelId, dispatch } = props;

  const handleSwitchChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(selectChannel({ currentChannelId: id }));
  };

  const handleAddChannel = (e) => {
    e.preventDefault();
    dispatch(openModal({ modalType: 'Add' }));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>+</button>
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

          if (c.removable) {
            return (
              <li className="nav-item" key={c.id}>
                <div role="group" className="d-flex mb-2 dropdown btn-group">
                  <button type="button" className="text-left flex-grow-1 nav-link btn btn-light" onClick={handleSwitchChannel(c.id)}>{c.name}</button>
                  <DropdownButton as={ButtonGroup} title="" id="bg-nested-dropdown">
                    <Dropdown.Item eventKey={c.id}>Rename</Dropdown.Item>
                    <Dropdown.Item eventKey={c.id}>Remove</Dropdown.Item>
                  </DropdownButton>
                </div>
              </li>
            );
          }

          return (
            <li className="nav-item" key={c.id}>
              <button type="button" className={classes} onClick={handleSwitchChannel(c.id)}>{c.name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(Channels);
