import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ItemItem from './ItemItem';
import ItemContext from '../../context/item/itemContext';
import Spinner from '../layout/Spinner';

const Items = () => {
  const itemContext = useContext(ItemContext);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  const { items, filtered, getItems, loading } = itemContext;

  if (items !== null && items.length === 0 && !loading) {
    return <h4>Please add an item</h4>;
  }

  return (
    <Fragment>
      {items !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((item) => (
                <CSSTransition key={item._id} timeout={500} classNames='item'>
                  <ItemItem item={item} />
                </CSSTransition>
              ))
            : items.map((item) => (
                <CSSTransition key={item._id} timeout={500} classNames='item'>
                  <ItemItem item={item} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Items;
