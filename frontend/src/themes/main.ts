export const values = {
  colors: {
    brand: "hsla(10, 79%, 51%, 1)",
    semantic: {
      primary: "hsla(207, 90%, 54%, 1)",
      success: "hsla(145, 63%, 49%, 1)",
      warning: "hsla(45, 100%, 51%, 1)",
      danger: "hsla(0, 78%, 62%, 1)",
      info: "hsla(200, 80%, 70%, 1)",
      light: "hsla(0, 0%, 96%, 1)",
      cancel: "hsla(0, 0%, 50%, 1)",
    },
    semanticContrast: {
      primary: "white",
      success: "white",
      warning: "black",
      danger: "white",
      info: "white",
      light: "black",
      cancel: "white",
    },
  },
  gutters: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    xxl: "24px",
  },
};

export const theme = {
  pages: {
    quiz: {
      panel: {
        background: "white",
        borderRadius: "16px",
        boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.25)",
      },
    },
    index: {
      subjectListItem: {
        margin: values.gutters.lg,
        name: {
          fontSize: "24px",
        },
        blurb: {
          fontSize: "16px",
        },
      },
    },
  },
  gridCutoffs: {
    500: 2,
    768: 3,
    1024: 4,
    1280: 5,
    1536: 6,
  },
  components: {
    LoadingOverlay: {
      opacityTransitionTime: "0.5s",
    },
  },
  colors: { ...values.colors },
  fontSize: {
    jumbotron: "64px",
  },
  gutters: values.gutters,
  form: {
    borderRadius: "16px",
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
        primary: "white",
      },
    },
    width: "80vw",
    background: "darkgray",
  },
  navbar: {
    height: "96px",
    background: "hsla(213, 16%, 57%, 1)",
    text: {
      primary: "white",
    },
  },
} as const;

export default theme;
