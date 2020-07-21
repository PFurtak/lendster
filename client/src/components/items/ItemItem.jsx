import React, { useContext } from 'react';
import ItemContext from '../../context/item/itemContext';
import PropTypes from 'prop-types';

const ItemItem = ({ item }) => {
  const itemContext = useContext(ItemContext);
  const { deleteItem, setCurrent, clearCurrent } = itemContext;
  const { _id, name, email, phone, type } = item;

  const onDelete = () => {
    deleteItem(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(item)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ItemItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemItem;
