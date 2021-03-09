import React, { useState } from "react";
// Hooks
import { useNavigation, useIsInCurrentPath } from "../../../../routes";
// Components
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Menu, Image, Button } from "semantic-ui-react";
import {
  DrawerMenuContainer,
  HamburguerButton,
  HamburguerIcon,
  DrawerItemsContainer,
} from "./styles";
// Navigation
import { menuRoutes } from "../../../../routes/routes";
// Assets
import WikkiLogo from "../../../../assets/images/WikkiBrazilLogo/WikkiBrazilLogo.png";

export const MobileDrawerMenu: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <DrawerMenuContainer>
      <HamburguerButton
        icon={<HamburguerIcon name={"sidebar"} size={"large"} />}
        onClick={openDrawer}
      />

      <SwipeableDrawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <DrawerItemsContainer vertical onClick={closeDrawer}>
          <Menu.Header style={{ marginTop: 5 }}>
            <Image centered size="tiny" src={WikkiLogo} />
          </Menu.Header>
          <DrawerItems />
        </DrawerItemsContainer>
      </SwipeableDrawer>
    </DrawerMenuContainer>
  );
};

const DrawerItems = () => {
  const { isInCurrentPath } = useIsInCurrentPath();
  const { navigateTo } = useNavigation();
  return (
    <Menu.Menu style={{ marginTop: 20 }}>
      {menuRoutes.map(({ pathname, label }) => (
        <Menu.Item
          name={label}
          active={isInCurrentPath(pathname)}
          onClick={() => navigateTo(pathname)}
          link
          style={{ fontSize: "1.5em" }}
        />
      ))}

      <Button
        style={{ position: "absolute", bottom: 15, right: 15 }}
        icon="sign-out"
      />
    </Menu.Menu>
  );
};
