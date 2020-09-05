import './App.css'
import React from 'react';
import DesktopLayout from './layouts/DesktopLayout'
import Router from './Router'
import { makeStyles } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  }
}))
const App = () => {
  const classes = useStyle()

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <DesktopLayout>
          <Router />
        </DesktopLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
