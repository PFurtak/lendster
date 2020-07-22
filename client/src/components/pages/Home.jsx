import React, { useContext, useEffect } from 'react';
import ItemForm from '../itemss/ItemForm';
import ItemFilter from '../items/ItemFilter';
import Items from '../items/Items';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ItemForm />
      </div>
      <div>
        <ItemFilter />
        <Items />
      </div>
    </div>
  );
};

export default Home;
