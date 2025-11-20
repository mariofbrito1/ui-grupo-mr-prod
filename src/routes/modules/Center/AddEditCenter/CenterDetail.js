import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import CmtCard from '../../../../@coremat/CmtCard';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import UserIcon from '@material-ui/icons/AccountBox';
import blue from '@material-ui/core/colors/blue';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';

const useStyles = makeStyles(theme => ({
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    '&.web': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark,
    },
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer',
  },
}));

const CenterDetail = ({ centerDetail }) => {
  useEffect(() => {
    console.log("pp >>>",centerDetail);
  }, [centerDetail]);

  const classes = useStyles();

  return (
    <CmtCard>
      {centerDetail && centerDetail.name && (
        <CmtCardContent>
          <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 6 }}>
            <Box className={clsx(classes.iconView, 'web')}>
              <UserIcon />
            </Box>
            <Box ml={5}>
              <Box component="span" fontSize={12} color="text.secondary">
                Nombre de Centro
              </Box>
              <Box component="p" className={classes.wordAddress} fontSize={16}>
                <Box>{centerDetail.name}</Box>
              </Box>
            </Box>
          </Box>
        </CmtCardContent>
      )}
    </CmtCard>
  );
};

export default CenterDetail;

ProfileDetail.prototype = {
  profileDetail: PropTypes.object.isRequired,
};
