import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export interface DocViewerProps {
  docEntry: any;
  classes: any;
  onClose: () => void;
}

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const DocViewerComponent = (props: DocViewerProps) => {
  const docEntry = props.docEntry;
  const { classes } = props;

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={docEntry ? true : false}
        onClose={() => {
          props.onClose();
        }}
      >
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Document
            </Typography>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Close"
              onClick={() => {
                props.onClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ height: '70vh' }}>
          {docEntry ? (
            <iframe
              scrolling="no"
              frameBorder="0"
              style={{ position: 'relative', height: '100%', width: '100%' }}
              sandbox="allow-scripts"
              src={docEntry.URL}
            />
          ) : null}
        </div>
      </Drawer>
    </div>
  );
};

export const DocViewer: any = withStyles(styles)(DocViewerComponent);
