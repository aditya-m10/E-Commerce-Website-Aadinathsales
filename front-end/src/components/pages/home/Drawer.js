import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {  useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import { getToken } from "../../../services/LocalStorage";

               
const pages = [{page:"Home",path:"/"}, {page:"Contact",path:"/contact"}];
const DrawerComp = () => {
  const { access_token } = getToken();
  const navigate=useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((item, index) => (
            <ListItemButton  onClick={()=>{navigate(item.path);setOpenDrawer(false)}} key={index}>
              <ListItemIcon >
                <ListItemText sx={{color:"green"}} >{item.page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          {access_token ?<><ListItemButton onClick={()=>{navigate("/dash");setOpenDrawer(false)}}>
              <ListItemIcon  >
                <ListItemText sx={{color:"green"}}>Dashboard</ListItemText>
              </ListItemIcon>
            </ListItemButton>
        </>:<><ListItemButton onClick={()=>{navigate("/reslogin" );setOpenDrawer(false)}}>
        <ListItemIcon 
           >
          <ListItemText sx={{color:"green"}} >Login</ListItemText>
        </ListItemIcon>
      </ListItemButton>
  </>}</List>
      </Drawer>
      <IconButton
        sx={{ color: "green", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;