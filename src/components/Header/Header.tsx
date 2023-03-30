import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

import a2gLogo from 'assets/images/a2g.jpeg'
import { useEffect, useState } from 'react';

const pages = [
{
    label: 'Панель администрирования',
    path: '/admins'
},
{
  label: 'Баны',
  path: '/bans'
},
{
  label: 'Статистика',
  path: '/stats'
  }
];

const settings = ['Logout'];






function ResponsiveAppBar() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState('Oopps')

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userData') || '');
    setUserInfo(userInfo.nickname);
    
  }, [])

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateHandler = (path: string) => {
    navigate(path)
  }

  const logout = () => {
    localStorage.clear();
    navigate('/login', {replace: true})
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Avatar alt='a2g logo' sx={{ width: 45, height: 45 }} src={a2gLogo} />
          <Typography
            variant="h6"
            noWrap
            component="a"            
            sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },            
            fontWeight: 700,              
            color: 'inherit',
            textDecoration: 'none',
            marginLeft: 2,
            marginRight: 5
            }}
          >
            Air 2 Grave
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Button onClick={() => navigateHandler(page.path)}>{page.label}</Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => navigateHandler(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Развернуть">
              <Typography variant="h6" onClick={handleOpenUserMenu} sx={{ p: 0, '&:hover': { opacity: 0.8, cursor: 'pointer'} }}>
               {userInfo}
              </Typography>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logout}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;