import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import { sidebarNavs } from '../menus';
//import { sidebarNavsVentas } from '../menus_ventas';

const useStyles = makeStyles(() => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const { authUser } = useSelector(({ auth }) => auth);
  const secciones =  authUser?.secciones;
  const [rol, setrol] = useState(null);

  useEffect(() => {
    if(secciones){
      //aca MARIOconsole.log("set", secciones[0].id_rol);
      setrol(1);
    }
  }, [authUser]);

  //TODO: MARIO ACA PONER ROL PARA VER LOS MENUES
  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      {true && <CmtVertical menuItems={sidebarNavs} />} 
    </PerfectScrollbar>
  );
};

export default SideBar;
