import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtCard from '../../../../@coremat/CmtCard';
import { fetchError } from 'redux/actions';
import { updateProductsCenters, getCentersByIdProduct } from '../../../../redux/actions/ProductosCentros';
import { addProduct, updateProduct, getProductById } from '../../../../redux/actions/Productos';

import { MultipleSelectCenter } from './MultipleSelectCenter';

const useStyles = makeStyles(theme => ({
  pageFull: {
    width: '100%',
  },
  ProductSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  ProductMainContent: {
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
  label: {
    flexGrow: 1,
  },
  textStyle: {
    padding: theme.spacing(3),
  },
  nameImg: {
    display: 'contents',
    alignItems: 'center',
  },
}));

const ProductAdd = () => {

  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [centros, setCenters] = useState([]);
  const [centerSelected, setCenterSelected] = useState([]);
  
  const dispatch = useDispatch();
  const { producto = null } = useSelector(state => state.productos);
  const { centers = [] } = useSelector(state => state.ProductosCentros);

  const [productDetail, setProductDetail] = useState({
    title: 'Productos',
    location: id === 'add' ? '/products/products/add' : `/products/products/${id}`,
    product_pic: '/images/pic/product_pic1.jpg',
  });

  const [product, setProduct] = useState({
    descripcion: '',
    imagen: '',
    kilogramos: '',
    precio: '',
    activo: true,
    opcional: '',
    sku: '',
    unidad_medida: 'KG',
    iva: 1
  });

  useEffect(() => {
    if (id !== 'add') dispatch(getProductById(id));
    if (id !== 'add') dispatch(getCentersByIdProduct(id));
  }, [dispatch]);


  useEffect(() => {
      setCenterSelected(centers);
      setCenters(centers);
  }, [centers]);
 
  useEffect(() => {
    if (producto) {
      const iva= parseFloat(producto.iva)*100;
      let prod = {...producto, iva: iva}
      setProduct(prod);
      setProductDetail({ ...productDetail, product_pic: producto.imagen });
      setImageUrl(producto.imagen);
    }
    if (id === 'add') {
      setProduct({
        descripcion: '',
        precio: '',
        kilogramos: '',
        activo: true,
        sku: '',
        opcional: '',
        imagen: '',
        iva: 1
      });
      setProductDetail({
        title: 'Productos',
        location: '/products/products/add',
        product_pic: '/images/pic/product_pic1.jpg',
      });
      setImageUrl('');
    }
  }, [producto]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProductChange = event => {
    //console.log("set prod", event.target.name, event.target.value)
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = event => {
    const imagen = event.target.files[0];
    try {
      if (imagen) {
        const { type } = imagen;
        if (type && type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
          dispatch(fetchError('El formato de archivo seleccionado no es válido.'));
          return;
        }
        setProductDetail({ ...productDetail, product_pic: URL.createObjectURL(imagen) });
        setProduct({ ...product, imagen: imagen });
        setImageUrl(imagen.name);
      }
    } catch (e) {
      dispatch(fetchError(`Ocurrió un error al intentar cargar el archivo seleccionado: ${e.message}`));
    }
  };

  const onCreateProduct = e => {
    e.preventDefault();
    dispatch(
      addProduct(product, () => {
        history.push('/products/products');
      })
    );
  };

  const onUpdateProduct = e => {
    e.preventDefault();
    const objProductsCenters = {
      centers: centros,
      product: product
    }
    dispatch(updateProductsCenters( objProductsCenters, ()=>{
      dispatch(updateProduct(product, () => {
        history.push('/products/products');
      }));
    }));
  };

  return (
    <React.Fragment>
      <Box className={classes.pageFull}>
        <form
          encType="multipart/form-data"
          className={classes.root}
          onSubmit={e => {
            id !== 'add' ? onUpdateProduct(e) : onCreateProduct(e);
          }}>
          <Header
            classes={classes}
            tabValue={tabValue}
            productDetail={productDetail}
            handleTabChange={handleTabChange}
          />
          <GridContainer>
            <Grid item xs={12} lg={12} className={classes.profileSidebar}>
              <Box mb={12}>
                <CmtCard>
                  <CmtCardHeader title={id !== 'add' ? 'Editar Producto' : 'Nuevo Producto'} />
                  <CmtCardContent>
                    <Grid container spacing={5} columns={12}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          name="descripcion"
                          label="Descripción"
                          required
                          fullWidth
                          value={product.descripcion || ''}
                          onChange={handleProductChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                            name="opcional"
                            label="Descripción Opcional"
                            fullWidth
                            value={product.opcional || ''}
                            onChange={handleProductChange}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="precio"
                          label="Precio"
                          type="number"
                          required
                          fullWidth
                          value={product.precio}
                          onChange={handleProductChange}
                          disabled={id !== 'add'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="sku"
                          label="SKU"
                          required
                          fullWidth
                          value={product.sku || ''}
                          onChange={handleProductChange}
                          disabled={id !== 'add'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="kilogramos"
                          label="Kg"
                          type="number"
                          required
                          fullWidth
                          value={product.kilogramos}
                          onChange={handleProductChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="active-select-label">Activo</InputLabel>
                          <Select name="activo" label="Activo" value={product.activo} onChange={handleProductChange}>
                            <MenuItem value={true}>Si</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          name="iva"
                          label="% Porcentaje de IVA"
                          type="number"
                          required
                          fullWidth
                          value={product.iva}
                          onChange={handleProductChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                            name="unidad_medida"
                            label="Unidad de Medida"
                            fullWidth
                            value={product.unidad_medida || ''}
                            onChange={handleProductChange}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <MultipleSelectCenter setCenters={setCenters} centerSelected={centerSelected}/>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <InputLabel htmlFor="upload-img" className={classes.label}>
                          <Grid container spacing={2}>
                            <Grid item xs={5} sm={5} md={5}>
                              <Button variant="contained" component="span" color="primary" size="small">
                                Seleccione Imágen
                              </Button>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} className={classes.nameImg} nowrap>
                              <span style={{ fontWeight: 'bold' }}>{imageUrl || 'No hay archivo seleccionado'}</span>
                            </Grid>
                          </Grid>
                        </InputLabel>
                        <Input
                          id="upload-img"
                          name="imagen"
                          fullWidth
                          type="file"
                          accept="image/*"
                          inputProps={{ style: { display: 'none' } }}
                          onChange={handleImageChange}
                        />
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
                          onClick={() => history.push('/products/products')}>
                            Cancelar
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                          Aceptar
                        </Button>
                      </Grid>
                    </Grid>
                  </CmtCardContent>
                </CmtCard>
              </Box>
            </Grid>
          </GridContainer>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default ProductAdd;
