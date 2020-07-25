import React, { useContext } from 'react';
import ItemContext from '../../context/item/itemContext';
import PropTypes from 'prop-types';
import moment from 'moment';

const ItemItem = ({ item }) => {
  const itemContext = useContext(ItemContext);
  const { deleteItem, setCurrent, clearCurrent } = itemContext;
  const {
    _id,
    item_name,
    borrower_name,
    date_lent,
    borrower_email,
    borrower_phone,
    borrower_relationship,
  } = item;

  const onDelete = () => {
    deleteItem(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {item_name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (borrower_relationship === 'friend' || 'family'
              ? 'badge-success'
              : 'badge-primary')
          }>
          {borrower_relationship.charAt(0).toUpperCase() +
            borrower_relationship.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {borrower_name && (
          <li>
            <i className='fas fa-user'></i> {borrower_name}
          </li>
        )}

        {date_lent && (
          <li>
            <i className='fas fa-calendar'></i> {moment(date_lent).format('LL')}
          </li>
        )}

        {borrower_email && (
          <li>
            <i className='fas fa-envelope-open'></i> {borrower_email}
          </li>
        )}
        {borrower_phone && (
          <li>
            <i className='fas fa-phone'></i> {borrower_phone}
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
