import React, { useState, useContext, useEffect } from 'react';
import ItemContext from '../../context/item/itemContext';

const ItemForm = () => {
  const itemContext = useContext(ItemContext);

  const { addItem, updateItem, clearCurrent, current } = itemContext;

  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem({
        item_name: '',
        borrower_name: '',
        date_lent: '',
        borrower_email: '',
        borrower_phone: '',
        borrower_relationship: 'friend',
      });
    }
  }, [itemContext, current]);

  const [item, setItem] = useState({
    item_name: '',
    borrower_name: '',
    date_lent: '',
    borrower_email: '',
    borrower_phone: '',
    borrower_relationship: 'friend',
  });

  const {
    item_name,
    borrower_name,
    date_lent,
    borrower_email,
    borrower_phone,
    borrower_relationship,
  } = item;

  const onChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addItem(item);
    } else {
      updateItem(item);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Item' : 'Add Item'}</h2>
      <input
        type='text'
        placeholder='Lent Item'
        name='item_name'
        value={item_name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Borrower Name'
        name='borrower_name'
        value={borrower_name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Date Lent'
        name='date_lent'
        value={date_lent}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Borrower Email'
        name='borrower_email'
        value={borrower_email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Borrower Phone'
        name='borrower_phone'
        value={borrower_phone}
        onChange={onChange}
      />
      <h5>Relationship with borrower:</h5>
      <input
        type='radio'
        name='borrower_relationship'
        value='friend'
        checked={borrower_relationship === 'friend'}
        onChange={onChange}
      />{' '}
      Friend{' '}
      <input
        type='radio'
        name='borrower_relationship'
        value='family'
        checked={borrower_relationship === 'family'}
        onChange={onChange}
      />{' '}
      Family{' '}
      <input
        type='radio'
        name='borrower_relationship'
        value='colleague'
        checked={borrower_relationship === 'colleague'}
        onChange={onChange}
      />{' '}
      Colleague{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Item' : 'Add Item'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ItemForm;
