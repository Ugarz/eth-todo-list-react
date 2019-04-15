/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';

import web3 from '../src/helpers/web3'

// Components
import Nav from '../components/Nav'
import Basic from '../components/Layouts/Basic'
import Panels from '../components/ControlledExpansionPanels'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
  },
});




class Index extends React.Component {
  state = {
    open: false,
    accounts: [{
      name: "Developer Account",
      balance: 100,
      currency: "ETH"
    }]
  };

  componentWillMount(){
    return web3.initialize().then(client => {
      console.log('client', client)
      // Update the state with accounts fetched from ETH network
      // FIXME: 
      // this.setState({
      //   accounts: client.accounts
      // })
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Nav />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Basic>
            <Typography variant="h4" gutterBottom>
              Ethereum Dapp try
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              This project aim to use the net and fetch some data from Ethereum Blockchain.
            </Typography>
            {
              !isEmpty(this.state.accounts) ?
                <Panels accounts={this.state.accounts} /> : <Typography variant="subtitle1" gutterBottom> No accounts found </Typography>
            }
          <Button variant="contained" color="secondary" onClick={this.handleClick}>
            Fetch data
          </Button>
        </Basic>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);