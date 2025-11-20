import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { editCenter, getCentrosById, updateCentro } from '../../../../redux/actions/Centros';

const useStyles = makeStyles(() => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  formControl: {
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
  noLabel: {},
}));

const AddEditCenter = () => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const centerDetail = {
    name: 'Configuración de Centros',
    location: '/center/center/'+id ,
  };
  // categoria
  const [centerState, setCenterState] = useState({
    id: null,
    nombre: '',
    centro:'',
    activo: true,
    almacen: '',
    lote: '',
  });

  const {nombre , almacen, lote, centro: centro_ , activo} = centerState;

  const { centro = '' } = useSelector(state => state.centros);

  useEffect(() => {
    if(centro){
      //console.log("CENT resp:", centro)
      setCenterState(centro);
    }
  }, [centro])
  

  const [tabValue, setTabValue] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = event => {
    event.target.name === 'centro_'?
    setCenterState({ ...centerState,centro: event.target.value })
    :
    setCenterState({ ...centerState, [event.target.name]: event.target.value })
  };

  const handleChangeSwitch = event => {
    setCenterState({ ...centerState, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    dispatch(getCentrosById(id));
  }, [dispatch]);

  const onUpdateCenter = event => {
    event.preventDefault();
    console.log("update", centerState);
    dispatch(updateCentro(centerState, () => history.push('/center')));
  };

  
  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <Header classes={classes} tabValue={tabValue} perfilDetail={centerDetail} handleTabChange={handleTabChange} />
        <GridContainer>
          <Grid item xs={12} lg={12} className={classes.profileSidebar}>
            <Box mb={12}>
              <CmtCard>
                <CmtCardHeader title={'Editar Centro'} />
                <CmtCardContent>
                  <form
                    className={classes.root}
                    onSubmit={e => onUpdateCenter(e) }>
                    <Grid container spacing={3}>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          name="nombre"
                          label="Nombre"
                          disabled={true}
                          required
                          fullWidth
                          onChange={handleChange}
                          value={nombre}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                          <TextField
                            name="centro_"
                            label="Centro"
                            required
                            fullWidth
                            onChange={handleChange}
                            value={centro_}
                          />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          name="almacen"
                          label="Almacen"
                          required
                          fullWidth
                          onChange={handleChange}
                          value={almacen}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          name="lote"
                          label="Lote"
                          required
                          fullWidth
                          onChange={handleChange}
                          value={lote}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <div  style={{ margin: '8px'}}>
                          <FormControlLabel
                            control={<Switch 
                              checked={activo} 
                              onChange={handleChangeSwitch} 
                              aria-label="switch" 
                              name="activo"
                              color='primary'
                              />}
                            label={activo ? 'Activado' : 'Desactivado'}
                          />
                        </div>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      columns={12}
                      spacing={3}
                      style={{
                        marginTop: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <Grid item>
                        <Button
                          type="button"
                          variant="contained"
                          color="secondary"
                          onClick={() => history.push('/center')}>
                          Cancelar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                          Aceptar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CmtCardContent>
              </CmtCard>
            </Box>
          </Grid>
        </GridContainer>
      </Box>
    </React.Fragment>
  );
};

export default AddEditCenter;
