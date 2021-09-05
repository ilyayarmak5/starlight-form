export default {
  colors: {
    error: "red",
    purple: "#4C358C",
    pink: "#b933a4",
    grey: "#C4C4C4",
    teal: "#75C9D3",
    white: "white",
    lightBlue: "#009FE1",
    red: "#ec4747",
    green: "#12b912",
    lightGreen: "#2fbca4",
    text: "#656565",
  },
  sizing: {
    pageWidth: "1000px",
    formWidth: "600px",
  },
  spacing: {
    xlarge: "80px",
    large: "40px",
    medium: "15px",
    small: "5px",
  },
  mixins: {
    leadParagraph: `
      font-size: 1.2rem;
      text-align: center;
    `,
    autoCompleteItem: `
      padding: 10px;
      cursor: pointer;
    `,
    autoCompleteItemHighlighted: `
      background: #F6F6F6;
    `,
    pathWidget: `
      margin-top: 20px;
      margin-bottom: 20px;
      h3 {
        margin-top: 0;
      }
      span {
        font-weight: bold;
      }
      p {
        margin-top: 20px;
      }
      input {
        display: block;
        width: 100%;
        margin: 5px 0;
      }
    `,
    error: `
      color: #ec4747;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      font-weight: bold;
      margin-top: 5px;
      i.material-icons {
        font-size: 0.8rem;
        margin-right: 5px;
      }
    `,
    showMobile: `
      @media (min-width: 1061px) {
        display: none;
      }
    `,
    hideMobile: `
      @media (max-width: 1060px) {
        display: none;
      }
    `,
  },
};

// Used to let you do math on PX values
export const stripPx = (value) => Number(value.split("px")[0]);
