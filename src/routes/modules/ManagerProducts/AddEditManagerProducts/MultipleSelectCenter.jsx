import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';
import { getCentrosActivos } from 'redux/actions/Centros';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(6),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, centerName, theme) {
  return {
    fontWeight: centerName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelectCenter = ({ setCenters, centerSelected }) => {

  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { listaCentros = [] } = useSelector(state => state.centros);
  
  const [center, setCenter] = React.useState([]);

  useEffect(() => {
    dispatch(getCentrosActivos());
  }, [dispatch, setCenter]);

  const handleChange = event => {
    const { id } = event.target.value[event.target.value.length-1];
    const match = center.findIndex(c => c.id === id);
    (match==-1)?setCenter(event.target.value):setCenter(center.filter(c => c.id !== id));
  };

  useEffect(() => {
    (center && center.length>0)?setCenters(center):setCenters([]);
  }, [center]);

  useEffect(() => {
    console.log("center selected", centerSelected);
    setCenter(centerSelected);
  }, [centerSelected]);
  

  return (
    <Box>
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel 
          id="demo-multiple-chip-label">
            Centros Asignados
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={center}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value.id} label={value.nombre} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}>
          {listaCentros.map(({nombre, id}) => (
            <MenuItem key={id} value={ { nombre: nombre, id: id } } style={getStyles(nombre, nombre, theme)}>
              {nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

MultipleSelectCenter.propTypes = {
  setCenters: PropTypes.func,
};