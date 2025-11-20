import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import useStyles from './index.style';

const UserTableToolbar = ({ onUserNew, updateSAP }) => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
        Listado de Usuarios o Personal{' '}
        {
          <>
            <Button style={{ marginLeft: '10px', marginRight: '10px' }} color="secondary" onClick={() => onUserNew()}>
              Nuevo Usuario/Personal
            </Button>
            {false &&
              <Button
                style={{ marginLeft: '15px', marginRight: '15px' }} 
                color="primary" 
                onClick={() => updateSAP()}>
                  Actualizar  
              </Button>
            }
          </>
        }
      </Typography>
    </Toolbar>
  );
};

UserTableToolbar.propTypes = {
  onUserNew: PropTypes.func.isRequired,
};

export default React.memo(UserTableToolbar);
