import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import useStyles from './index.style';

const CenterTableToolbar = ({}) => {
  const classes = useStyles();

  return (
    <>
      <Toolbar>
        <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
          Listado de Centros {'  '}
        </Typography>
      </Toolbar>
    </>
  );
};

CenterTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onNewData: PropTypes.func.isRequired,
};

export default React.memo(CenterTableToolbar);
