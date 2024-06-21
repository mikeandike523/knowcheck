export const values = {
  colors: {
    brand: "hsla(10, 79%, 51%, 1)"
  }
}

export const theme = {
  gridCutoffs:{
    500: 2,
    768: 3,
    1024: 4,
    1280: 5,
    1536: 6
    
  },
  components:{
    LoadingOverlay: {
      opacityTransitionTime: "0.5s",
    }
  },
  colors: {...values.colors },
  fontSize: {
    jumbotron: "64px",
  },
  gutters: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    xxl: "24px",
  },
  card: {
    text: {
      accent: values.colors.brand,
      muted: "hsla(213, 16%, 57%, 1)",
      primary: "black",
    },
    background: "hsla(50, 80%, 80%, 1)",
  },
  page: {
    mainContent: {
      background: "hsla(200, 20%, 67%, 1)",
      text: {
        primary: "white"
      }
    },
    width: "80vw",
    background:"darkgray"
  },
  navbar: {
    background: "hsla(213, 16%, 57%, 1)",
    text: {
      primary: "hsla(100, 70%, 85%, 1)"
    }
  },
} as const;

export default theme;
