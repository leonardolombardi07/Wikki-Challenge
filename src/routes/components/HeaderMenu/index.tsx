import React from "react";
// Hooks
import { useIsInCurrentPath, useNavigation } from "../../../routes";
import { useAuthModals } from "./useAuthModals";
import { useActions, useSelector } from "../../../redux";
// Components
import { Menu } from "semantic-ui-react";
import {
  SemanticMenu,
  // DesktopHeaderItemsContainer,
  HeaderMenuItem,
} from "./styles";
import { MobileDrawerMenu } from "../../../routes/components/HeaderMenu/MobileDrawerMenu";
import { AuthModal } from "./AuthModal";
import { OutlinedButton } from "../../../components";
// Redux
import { selectIsAuthenticated } from "../../../redux/auth";
import { selectUser } from "../../../redux/user";
// Navigation
import { menuRoutes } from "../../../routes/routes";

export const HeaderMenu: React.FC = () => {
  const {
    isSignInModalOpen,
    isSignUpModalOpen,
    openSignInModal,
    closeSignInModal,
    openSignUpModal,
    closeSignUpModal,
  } = useAuthModals();
  return (
    <>
      <SemanticMenu borderless size="large">
        <MobileDrawerMenu />
        <HeaderItems openSignInModal={openSignInModal} />
      </SemanticMenu>

      <AuthModal
        isSignInModalOpen={isSignInModalOpen}
        openSignInModal={openSignInModal}
        closeSignInModal={closeSignInModal}
        isSignUpModalOpen={isSignUpModalOpen}
        openSignUpModal={openSignUpModal}
        closeSignUpModal={closeSignUpModal}
      />
    </>
  );
};

interface HeaderItemsProps {
  openSignInModal: () => void;
}

const HeaderMenuRightItems: React.FC<HeaderItemsProps> = ({
  openSignInModal,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { email } = useSelector(selectUser);
  const { signOut } = useActions();
  if (isAuthenticated) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            fontWeight: "bold",
            color: "white",
            marginTop: 13,
            marginRight: 15,
          }}
        >
          {email}
        </p>
        <HeaderMenuItem
          name={"Sair"}
          active={false}
          onClick={() => signOut()}
          link
        />
      </div>
    );
  }

  return (
    <OutlinedButton
      size={"medium"}
      style={{ height: 45, alignSelf: "center" }}
      onClick={openSignInModal}
    >
      Entrar
    </OutlinedButton>
  );
};

const HeaderItems: React.FC<HeaderItemsProps> = ({ openSignInModal }) => {
  const { isInCurrentPath } = useIsInCurrentPath();
  const { navigateTo } = useNavigation();
  return (
    <>
      {menuRoutes.map(({ pathname, label }) => (
        <HeaderMenuItem
          name={label}
          active={isInCurrentPath(pathname)}
          onClick={() => navigateTo(pathname)}
          link
        />
      ))}

      <Menu.Menu position="right">
        <HeaderMenuRightItems openSignInModal={openSignInModal} />
      </Menu.Menu>
    </>
  );
};
