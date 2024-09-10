import React from 'react';
import { makeStyles } from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import ExtensionIcon from '@mui/icons-material/Extension';
import MapIcon from '@mui/icons-material/MyLocation';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import CreateComponentIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import { useApp } from '@backstage/core-plugin-api';

// Custom Logo Components
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';

// Sidebar Plugins and Components
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
  SidebarSubmenu,
  SidebarSubmenuItem,
} from '@backstage/core-components';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';

// Import the sidebar CSS
import '../../theme/sidebar.css';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 5 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo: React.FC = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

export const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SidebarPage>
    <Sidebar>
      <SidebarLogo />
      <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
        <SidebarSearchModal />
      </SidebarGroup>
      <SidebarDivider />
      <SidebarGroup label="Menu" icon={<MenuIcon />}>
        <SidebarItem icon={HomeIcon as React.ComponentType} to="/" text="Home">
          <SidebarSubmenu title="Essity Catalog">
            <SidebarSubmenuItem
              title="Domains"
              to="catalog?filters[kind]=domain"
              icon={useApp().getSystemIcon('kind:domain')}
            />
            <SidebarSubmenuItem
              title="Systems"
              to="catalog?filters[kind]=system"
              icon={useApp().getSystemIcon('kind:system')}
            />
            <SidebarSubmenuItem
              title="Components"
              to="catalog?filters[kind]=component"
              icon={useApp().getSystemIcon('kind:component')}
            />
            <SidebarSubmenuItem
              title="APIs"
              to="catalog?filters[kind]=api"
              icon={useApp().getSystemIcon('kind:api')}
            />
            <SidebarSubmenuItem
              title="Templates"
              to="catalog?filters[kind]=template"
              icon={useApp().getSystemIcon('kind:template')}
            />
            <SidebarDivider />
            <SidebarSubmenuItem
              title="Resources"
              to="catalog?filters[kind]=resource"
              icon={useApp().getSystemIcon('kind:resource')}
            />
            <SidebarDivider />
            <SidebarSubmenuItem
              title="Groups"
              to="catalog?filters[kind]=group"
              icon={useApp().getSystemIcon('kind:group')}
            />
            <SidebarSubmenuItem
              title="Users"
              to="catalog?filters[kind]=user"
              icon={useApp().getSystemIcon('kind:user')}
            />
          </SidebarSubmenu>
        </SidebarItem>
        <SidebarItem icon={CategoryIcon as React.ComponentType} to="catalog" text="Catalog" />
        <SidebarItem icon={ExtensionIcon as React.ComponentType} to="api-docs" text="APIs" />
        <SidebarItem icon={LibraryBooks as React.ComponentType} to="docs" text="Docs" />
        <SidebarItem icon={CreateComponentIcon as React.ComponentType} to="create" text="Create..." />
        <SidebarDivider />
        <SidebarScrollWrapper>
          <SidebarItem icon={StoreIcon as React.ComponentType} to="tech-radar" text="Demo" />
          <SidebarItem icon={MapIcon as React.ComponentType} to="tech-radar" text="Tech Radar" />
        </SidebarScrollWrapper>
      </SidebarGroup>
      <SidebarSpace />
      <SidebarDivider />
      <SidebarGroup
        label="Settings"
        icon={<UserSettingsSignInAvatar />}
        to="/settings"
      >
        <SidebarSettings />
      </SidebarGroup>
    </Sidebar>
    {children}
  </SidebarPage>
);
