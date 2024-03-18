import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../theme';
import { setIsCartOpen } from '../state';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isMobile = useMediaQuery({ query: `(max-width: 900px)` });
  const [open, setOpen] = useState(false);

  

  return (
    <Box
      onClick={() => {if (open) setOpen(!open)}}
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 2555, 255, 0.95"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ '&:hover': { cursor: "pointer" }}}
          color={shades.secondary[500]}
        >
          Cut Above Granite Solutions
        </Box>

        {
        isMobile 
        ? <Box></Box>
        : <Box
          width="80%"
          margin="auto"
          display="flex"  
        >
          {/* <Box
            onClick={() => navigate("/about")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            marginRight="25px"
          >
            About
          </Box> */}
          {/* <Box
            onClick={() => navigate("/services")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            marginRight="25px"
          >
            Services
          </Box> */}
          <Box
            onClick={() => navigate("/products")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            marginRight="25px"
          >
            Products
          </Box>
          {/* <Box
            onClick={() => navigate("/estimate")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            marginRight="25px"
          >
            Get an Estimate
          </Box> */}
          {/* <Box
            onClick={() => navigate("/visualizer")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            marginRight="25px"
          >
            Visualizer
          </Box> */}
          {/* <Box
            onClick={() => navigate("/contact")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            marginRight="25px"
          >
            Contact
          </Box> */}
        </Box>
        }
        
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              }
            }}
          >
            <IconButton
              onClick={() => navigate("/account")}
              sx={{ color: "black"}}
            >
              <PersonOutline />
            </IconButton>
            <IconButton 
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black"}}
            >
              <ShoppingBagOutlined />
            </IconButton>
            {
              isMobile
              ? <IconButton
                onClick={() => setOpen(!open)}
                sx={{ color: "black"}}
              >
                <MenuOutlined />
              </IconButton>
              : null
            } 
          </Badge>
        </Box>
        {
        isMobile && open
        ? <Box
          width="80%"
          position="absolute"
          top="60px"
          display="block"
          flexDirection="column"
          borderTop="1px solid black"
          zIndex="1"
          backgroundColor="rgba(255, 255, 255, 255)"
        >
          {/* <Box
            onClick={() => navigate("/about")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            margin="10px"
          >
            About
          </Box> */}
          {/* <Box
            onClick={() => navigate("/services")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            margin="10px"
          >
            Services
          </Box> */}
          {/* <Box
            onClick={() => navigate("/products")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            margin="10px"
          >
            Products
          </Box> */}
          <Box
            onClick={() => navigate("/estimate")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            margin="10px"
          >
            Get an Estimate
          </Box>
          {/* <Box
            onClick={() => navigate("/visualizer")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            margin="10px"
          >
            Visualizer
          </Box> */}
          {/* <Box
            onClick={() => navigate("/contact")}
            sx={{ '&:hover': { cursor: "pointer" }}}
            margin="10px"
          >
            Contact
          </Box> */}
        </Box>
        : null
        }
      </Box>
    </Box>
  );
};

export default Navbar;