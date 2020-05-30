import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import axios from "axios";

function Dropdown({ title, items, multiSelect = false, filter}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (multiSelect) {
        setSelection([item]);
        filter=item.filVal;
        toggle()
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
      filter='partial';
      toggle()
    }
  }

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dd-wrapper inline">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
      <div className="card card-body mb-4 p-4">
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
      </div>
    <div className="card card-body mb-4 p-4">
        <div className="dd-header__action">
          <p className="dd-header__title--bold" text="center">{open ? 'Close' : 'Open'}</p>
        </div>
    </div>
    </div>
      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
                <span>{isItemInSelection(item) && <a href="#" class="btn btn-info btn-lg">
          <span class="glyphicon glyphicon-ok"></span> Ok 
        </a>}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);