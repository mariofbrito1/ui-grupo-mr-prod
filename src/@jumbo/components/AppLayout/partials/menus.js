import React from 'react';
import { 
  Contacts, Pages, People, PostAdd, Timeline, Widgets, Category,
  DirectionsCar, Person, Build, Settings, LocalGasStation, 
  Assignment, Description, AllInbox, Timeline as PlanningIcon
} from '@material-ui/icons';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import TireRepairIcon from '@material-ui/icons/DonutLarge';
import StorageIcon from '@material-ui/icons/Storage';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FolderIcon from '@material-ui/icons/Folder';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'sidebar.modules.users'} />,
        icon: <People />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.profiles'} />,
            type: 'item',
            icon: <PostAdd />,
            link: '/user/roles',
          },  
          {
            name: <IntlMessages id={'sidebar.modules.users'} />,
            type: 'item',
            icon: <PostAdd />,
            link: '/user/users',
          },
          {
            name: <IntlMessages id={'sidebar.modules.users.permissions'} />,
            type: 'item',
            icon: <PostAdd />,
            link: '/user/permissions',
          },
          {
            name: <IntlMessages id={'sidebar.modules.users.category'} />,
            type: 'item',
            icon: <PostAdd />,
            link: '/user/categories',
          },
        ],
      },
      {
        name: <IntlMessages id={'sidebar.center'} />,
        icon: <Widgets />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.center'} />,
            type: 'item',
            icon: <PostAdd />,
            link: '/center',
          },
        ],
      },
      
      // NUEVAS SECCIONES - FLOTA VEHICULAR
      {
        name: <IntlMessages id={'sidebar.fleet.management'} />,
        icon: <DirectionsCar />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.vehicles'} />,
            type: 'item',
            icon: <LocalShippingIcon />,
            link: '/fleet/vehicles',
          },
          {
            name: <IntlMessages id={'sidebar.drivers'} />,
            type: 'item',
            icon: <Person />,
            link: '/fleet/drivers',
          },
          {
            name: <IntlMessages id={'sidebar.units'} />,
            type: 'item',
            icon: <ListAltIcon />,
            link: '/fleet/units',
          },
        ],
      },
      
      // MANTENIMIENTOS Y REPUESTOS
      {
        name: <IntlMessages id={'sidebar.maintenance'} />,
        icon: <Build />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.maintenance.plans'} />,
            type: 'item',
            icon: <Assignment />,
            link: '/maintenance/plans',
          },
          {
            name: <IntlMessages id={'sidebar.maintenance.schedule'} />,
            type: 'item',
            icon: <PlanningIcon />,
            link: '/maintenance/schedule',
          },
          {
            name: <IntlMessages id={'sidebar.spare.parts'} />,
            type: 'item',
            icon: <AllInbox />,
            link: '/maintenance/spare-parts',
          },
          {
            name: <IntlMessages id={'sidebar.tires'} />,
            type: 'item',
            icon: <TireRepairIcon />,
            link: '/maintenance/tires',
          },
        ],
      },
      
      // COMBUSTIBLES Y TANQUES
      {
        name: <IntlMessages id={'sidebar.fuel.management'} />,
        icon: <LocalGasStation />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.tanks'} />,
            type: 'item',
            icon: <StorageIcon />,
            link: '/fuel/tanks',
          },
          {
            name: <IntlMessages id={'sidebar.fuel.planning'} />,
            type: 'item',
            icon: <ScheduleIcon />,
            link: '/fuel/planning',
          },
        ],
      },
      
      // OPERATIVIDAD DIARIA
      {
        name: <IntlMessages id={'sidebar.operations'} />,
        icon: <ScheduleIcon />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.daily.planning'} />,
            type: 'item',
            icon: <PlanningIcon />,
            link: '/operations/daily-planning',
          },
          {
            name: <IntlMessages id={'sidebar.operational.control'} />,
            type: 'item',
            icon: <Timeline />,
            link: '/operations/control',
          },
        ],
      },
      
      // DOCUMENTACIÓN
      {
        name: <IntlMessages id={'sidebar.documentation'} />,
        icon: <FolderIcon />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.driver.docs'} />,
            type: 'item',
            icon: <Description />,
            link: '/docs/drivers',
          },
          {
            name: <IntlMessages id={'sidebar.unit.docs'} />,
            type: 'item',
            icon: <Description />,
            link: '/docs/units',
          },
        ],
      },
      
      // PARAMETRIZACIONES
      {
        name: <IntlMessages id={'sidebar.parameters'} />,
        icon: <Settings />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.configurations'} />,
            type: 'item',
            icon: <Category />,
            link: '/parameters/config',
          },
          {
            name: <IntlMessages id={'sidebar.categories'} />,
            type: 'item',
            icon: <ListAltIcon />,
            link: '/parameters/categories',
          },
        ],
      },
    ],
  },
];

// 🔧 EXPORTACIONES PARA LAYOUTS HORIZONTALES
export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'sidebar.modules.users'} />,
        type: 'item',
        icon: <People />,
        link: '/user/users',
      },
      {
        name: <IntlMessages id={'sidebar.fleet.management'} />,
        type: 'item',
        icon: <DirectionsCar />,
        link: '/fleet/vehicles',
      },
      {
        name: <IntlMessages id={'sidebar.maintenance'} />,
        type: 'item',
        icon: <Build />,
        link: '/maintenance/plans',
      },
      {
        name: <IntlMessages id={'sidebar.operations'} />,
        type: 'item',
        icon: <ScheduleIcon />,
        link: '/operations/daily-planning',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'sidebar.modules.users'} />,
        type: 'item',
        icon: <People />,
        link: '/user/users',
      },
      {
        name: <IntlMessages id={'sidebar.fleet.management'} />,
        type: 'item',
        icon: <DirectionsCar />,
        link: '/fleet/vehicles',
      },
    ],
  },
];