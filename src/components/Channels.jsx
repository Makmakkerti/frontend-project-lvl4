/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dropdown, DropdownButton, Button, ButtonGroup,
} from 'react-bootstrap';
import cn from 'classnames';
import { openModal, setModalType } from '../store/modal';
import { selectChannel } from '../store/currentChannel';

const Channels = ({ i18next }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId);

  const handleSwitchChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(selectChannel({ currentChannelId: id }));
  };

  const handleModalType = (type) => (e) => {
    e.preventDefault();
    dispatch(setModalType({ type }));
    dispatch(openModal());
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{i18next.t('titles.channels')}</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleModalType('adding')}>+</button>
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
                      <Dropdown.Item eventKey={c.id} onClick={handleModalType('renaming')}>
                        {i18next.t('buttons.rename')}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={c.id} onClick={handleModalType('removing')}>
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

export default Channels;
