import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import NotFound from './pages/NotFound';
// import ErrorPage from './pages/ErrorPage';
import ExchangeRatePage from './pages/ExchangeRate';
import AboutPage from './pages/About';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:800px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: 'EMICalculator/' },
    { label: 'Exchange Rates (Live)', path: 'EMICalculator/exchange' },
    { label: 'About', path: 'EMICalculator/about' },
    // { label: 'Error Page', path: '/error' },
  ];

  const navLinkStyle = {
    textDecoration: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
  };

  const activeStyle = {
    backgroundColor: theme.palette.primary.dark,
  };

  const drawerNavStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    padding: '16px',
    borderBottom: '1px solid #eee',
  };

  const activeDrawerStyle = {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  };

  return (
    <Router>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          {isMobile && (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)} edge="start">
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250 }}>
                  <List disablePadding>
                    {navItems.map(({ label, path }) => (
                      <NavLink 
                        to={path} 
                        key={label}
                        end={label === 'Home'}
                        style={({ isActive }) => ({
                          ...drawerNavStyle,
                          ...(isActive ? activeDrawerStyle : {}),
                        })}
                        onClick={() => setDrawerOpen(false)}
                      >
                        {label}
                      </NavLink>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map(({ label, path }) => (
                <NavLink
                  key={label}
                  to={path}
                  end={label === 'Home'}
                  style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                  })}
                >
                  <Typography variant="button">{label}</Typography>
                </NavLink>
              ))}
            </Box>
          )}

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="EMICalculator/" element={<Calculator />} />
          <Route path="EMICalculator/exchange" element={<ExchangeRatePage />} />
          <Route path="EMICalculator/about" element={<AboutPage />} />
          {/* <Route path="/error" element={<ErrorPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
