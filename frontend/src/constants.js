import { createMuiTheme } from "@material-ui/core/styles";
import { PRIMARY_MAIN } from "./utils/colors";
import { grey } from "@material-ui/core/colors";

export const TOAST_AUTO_HIDE_DURATION = 4000;

export const grid = 8;
export const borderRadius = 4;
export const imageSize = 40;
export const barHeight = 50;
export const sidebarWidth = 120;
export const taskHeaderTextareaWidth = 180;

export const MD_EDITOR_PLUGINS = [
  "header",
  "fonts",
  "table",
  "link",
  "mode-toggle",
  "full-screen",
];

export const MD_EDITOR_CONFIG = {
  view: {
    menu: true,
    md: true,
    html: false,
  },
  canView: {
    menu: true,
    md: true,
    html: true,
    fullScreen: true,
    hideMenu: false,
  },
};

export const MD_EDITING_CONFIG = {
  view: {
    menu: false,
    md: true,
    html: false,
  },
  canView: {
    menu: false,
    md: true,
    html: false,
    fullScreen: false,
    hideMenu: false,
  },
};

export const MD_READ_ONLY_CONFIG = {
  view: {
    menu: false,
    md: false,
    html: true,
  },
  canView: {
    menu: false,
    md: false,
    html: true,
    fullScreen: false,
    hideMenu: false,
  },
};

export const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: PRIMARY_MAIN,
    },
    secondary: {
      light: grey[700],
      main: "#FDB915",
    },
  },
  typography: {
    fontFamily: 'sans-serif',
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiDialog: {
      transitionDuration: 100,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        "&:hover": {
          transition: "none",
        },
      },
    },
  },
});

export const modalPopperIndex = theme.zIndex.modal + 100;
export const modalPopperAutocompleteIndex = modalPopperIndex + 100;
export const modalPopperAutocompleteModalIndex = modalPopperAutocompleteIndex + 100;
export const modalPopperWidth = 300;

const localhost = `${process.env.REACT_APP_DOMAIN_URL}`;
export const endpoint = `${localhost}`;

export const cursusListURL = `${endpoint}/api-authentication/cursus/`;
export const facultyListURL = `${endpoint}/api-authentication/faculty/`;
export const jobListURL = `${endpoint}/api-authentication/job/`;
