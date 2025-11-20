//import UserDataService from "../services/elaborados.service";

export const typeSection = {
  ADMIN: 1,
  DASHBOARD: 2,
  PERFILES: 3,
  SECCIONES: 4,
  USUARIOS: 5,
  VENTAS: 6,
  COMPRAS: 7,
  PRODUCTOS: 8,
  ROLES_ADD: 9,
  CATEGORIA: 12,
  LISTA_PRECIOS: 14,
};

export const tieneAccesoASeccion = (secciones, seccion) => {
  if (secciones && seccion) {
    for (let a = 0; a < secciones.length; a++) {
      //console.log('seccion a', secciones[a].id_seccion, 'vvv', seccion);
      if (seccion === secciones[a].id_seccion) {
        //console.log('TIENE ACCESSO A LA SECCION', secciones[a].id_seccion);
        return true;
      }
    }
  }
  //console.log('FALSE');
  return false;
};
