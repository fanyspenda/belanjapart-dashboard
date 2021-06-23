/* eslint-disable camelcase */
import React, { useState } from 'react';
import { CustomInput } from 'reactstrap';
import { getImage } from '@helpers/image';
import file_error from '../../../../public/images/icon/error-image-generic.png';

const ListItem = ({ id, name, path, toggle }) => {
  const [checked, setChecked] = useState(false);

  const setToggle = () => setChecked(!checked);

  const addDefaultSrc = ev => {
    ev.target.src = file_error;
  };

  return (
    <li className="list-group-item mr-2 mb-2 bg-transparent border-0 p-1">
      <div
        className="p-2 img-thumbnail bg-transparent"
        style={{ width: 132, height: 136 }}
      >
        <CustomInput
          type="checkbox"
          id={`cb-${id}`}
          checked={checked}
          onChange={() => {
            toggle(id);
            setToggle();
          }}
        />
        <div className="d-flex align-items-center justify-content-center pt-2">
          <img
            className="rounded img-fluid"
            onError={addDefaultSrc}
            src={getImage(path)}
            alt={name}
            style={{ maxHeight: 80 }}
          />
        </div>
      </div>
      <b>{name}</b>
    </li>
  );
};

export default ListItem;
