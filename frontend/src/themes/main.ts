export const values = {
  colors: {
    brand: "hsla(10, 79%, 51%, 1)",
    semantic: {
      // A form of blue typically
      primary: "hsla(207, 90%, 54%, 1)", // Blue
      // Typically green
      success: "hsla(145, 63%, 49%, 1)", // Green
      // Typically yellow
      warning: "hsla(45, 100%, 51%, 1)", // Yellow
      // typically red
      danger: "hsla(0, 78%, 62%, 1)", // Red
      // Typically lighter blue
      info: "hsla(200, 80%, 70%, 1)", // Light Blue
      // Typically silver or white
      light: "hsla(0, 0%, 96%, 1)", // Light Gray / Silver
      // Typically grey
      cancel: "hsla(0, 0%, 50%, 1)", // Grey
    },
    // Typically used for text inside buttons
    semanticContrast: {
      primary: "white",
      success: "white",
      warning: "black",
      danger: "white",
      info: "white",
      light: "black",
      cancel: "white",
    }
  },
  gutters: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    xxl: "24px",
  },
}

export const theme = {
  pages:{
    index: {
      subjectListItem:{
        margin: values.gutters.lg,
        name:{
          fontSize:"24px"
        },
        blurb: {
          fontSize:"16px"
        }
      }
    }
  },
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
  gutters:values.gutters,
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
