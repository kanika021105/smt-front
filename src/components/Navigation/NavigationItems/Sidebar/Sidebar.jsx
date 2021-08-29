import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';
import ThemeContext from '../../../../context/theme.context';

function Sidebar({ children, expand }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`sidebar ${expand && 'expand'} ${theme === 'dark' && 'dark'}`}>
      {children}
    </div>
  );
}

// PropTypes validation
Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  expand: PropTypes.bool.isRequired,
};

export default Sidebar;
