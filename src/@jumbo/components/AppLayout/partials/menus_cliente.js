import React from 'react';
import { Contacts, PostAdd } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';

// ACA VA EL MENU MFB
export const sidebarNavsCliente = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'sidebar.purchase'} />,
        icon: <Contacts />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.purchase'} />,
            type: 'item',
            icon: <PostAdd />,
            link: '/purchase/purchase',
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
