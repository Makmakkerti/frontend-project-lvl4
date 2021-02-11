/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import {
  Dropdown, DropdownButton, Button, ButtonGroup,
} from 'react-bootstrap';
import cn from 'classnames';
import { selectChannel } from '../store/currentChannel';
import { openModal, setModalType } from '../store/modal';

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

  const handleAddModal = (e) => {
    e.preventDefault();
    dispatch(setModalType({ type: 'adding' }));
    dispatch(openModal());
  };

  const handleRenameModal = (e) => {
    e.preventDefault();
    dispatch(setModalType({ type: 'renaming' }));
    dispatch(openModal());
  };

  const handleRemoveModal = (e) => {
    e.preventDefault();
    dispatch(setModalType({ type: 'removing' }));
    dispatch(openModal());
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{i18next.t('titles.channels')}</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddModal}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {
          channels.map((c) => {
            const buttonStatus = c.id === currentChannelId ? 'primary' : 'light';
            const defaultBtnClasses = cn(
              'nav-link',
              'btn-block',
              'mb-2',
              'text-left',
              'btn',
              {
                [`btn-${buttonStatus}`]: true,
              },
            );

            const addedBtnClasses = cn(
              'text-left',
              'flex-grow-1',
              'nav-link',
              'btn',
              {
                [`btn-${buttonStatus}`]: true,
              },
            );

            const dropdownBtnClasses = cn(
              'flex-grow-0',
              'dropdown-toggle-split',
              'btn',
              {
                [`btn-${buttonStatus}`]: true,
              },
            );

            if (c.removable) {
              return (
                <li className="nav-item" key={c.id}>
                  <ButtonGroup role="group" className="d-flex mb-2 dropdown btn-group" onClick={handleSwitchChannel(c.id)}>
                    <Button type="button" className={addedBtnClasses}>{c.name}</Button>
                    <DropdownButton title="" type="button" aria-haspopup="true" className={dropdownBtnClasses} id="bg-nested-dropdown">
                      <Dropdown.Item eventKey={c.id} onClick={handleRenameModal}>
                        {i18next.t('buttons.rename')}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={c.id} onClick={handleRemoveModal}>
                        {i18next.t('buttons.remove')}
                      </Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </li>
              );
            }

            return (
              <li className="nav-item" key={c.id}>
                <button type="button" className={defaultBtnClasses} onClick={handleSwitchChannel(c.id)}>{c.name}</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(Channels);
