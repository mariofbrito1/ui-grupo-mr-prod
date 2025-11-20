import React from 'react';
import { Contacts, Pages, People, PostAdd, Timeline, Widgets, Category } from '@material-ui/icons';
import ListAltIcon from '@material-ui/icons/ListAlt';
import IntlMessages from '../../../utils/IntlMessages';

// ACA VA EL MENU MFB
export const sidebarNavsVentas = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'sidebar.sale'} />,
        icon: <Contacts />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.pedidos'} />,
            type: 'item',
            icon: <PostAdd />,
            link: '/sale/sale',
          },
        ],
      },
      {
        name: <IntlMessages id={'sidebar.products'} />,
        icon: <Widgets />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.management_products'} />,
            type: 'item',
            icon: <Pages />,
            link: '/products/products',
          },
          {
            name: <IntlMessages id={'sidebar.management_list_products'} />,
            type: 'item',
            icon: <ListAltIcon />,
            link: '/products/list_products',
          },
        ],
      },
    ],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
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
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/sample-page',
      },
    ],
  },
];
