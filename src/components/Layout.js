/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import theme from "../theme";
import { Fragment } from "react";
import background from "../images/bg-gradient.png";
import womanBg from "../images/woman-bg.png";

export default ({ children }) => {
  return (
    <div>
      <div
      // css={css`
      //   // background: url("https://raisely-images.imgix.net/tourdekids-2020/uploads/screen-shot-2020-07-03-at-6-51-50-am-png-6a34cf.png?fm=jpg&w=2000");
      //   // #f7f7f7;
      //   background: url("${background}");
      //   background-size: 100% auto;
      //   background-position: center top;
      //   min-height: 100vh;
      //   background-repeat: no-repeat;
      //   position: relative;
      // `}
      >
        <div
          css={css`
            // background: url("https://raisely-images.imgix.net/tourdekids-2020/uploads/screen-shot-2020-07-03-at-6-51-50-am-png-6a34cf.png?fm=jpg&w=2000");
            // #f7f7f7;
            background: url("${background}");
            background-size: 100% auto;
            background-position: center top;
            min-height: 100vh;
            background-repeat: no-repeat;
            position: relative;
          `}
        >
          <img
            src={womanBg}
            alt=""
            css={css`
              max-width: 100%;
              position: absolute;
              max-height: 100%;
              object-fit: contain;
            `}
          />

          <img
            src={womanBg}
            alt=""
            css={css`
              max-width: 30%;
              position: absolute;
              right: 0;
              object-fit: cover;
            `}
          />
        </div>
        <Global
          styles={css`
            body,
            html {
              margin: 0;
              padding: 0;
            }
          `}
        />
        {children}
      </div>
    </div>
  );
};

export const LayoutHeader = ({ children }) => (
  <div
    css={css`
      color: ${theme.colors.white};
      position: relative;

      background-size: cover;
      height: auto; /* Keep full image visible */
      padding-bottom: 4rem;
      padding-top: 4rem;
      background-position: bottom;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-width: 768px) {
        background-position: 66% 50%;
        padding-bottom: 130px;

        h1 {
          margin-top: 0;
        }
      }
    `}
  >
    <div
      css={css`
        max-width: ${theme.sizing.pageWidth};
        margin: 0 auto;
        position: relative;
        z-index: 2;
        @media (max-width: 1060px) {
          padding: 0 40px;
        }
      `}
    >
      {children}
    </div>
  </div>
);

export const LayoutBody = ({ children, showBasket, showTotal }) => (
  <Fragment>
    <div
      css={css`
        max-width: ${theme.sizing.formWidth};
        margin: 0 auto;
        position: relative;
        padding: ${theme.spacing.large};
        background: white;
        margin-top: 0;
        border-radius: 10px;
        > h2 {
          margin-top: 0;
          font-size: 2rem;
          text-align: center;
        }
        .field-wrapper + .field-wrapper {
          margin-top: ${theme.spacing.medium};
        }
        @media (max-width: 450px) {
          padding: 20px;
          margin: -80px 20px 0;
        }
      `}
    >
      {children}
    </div>
  </Fragment>
);

export const FormDivider = () => (
  <hr
    css={css`
      clear: both;
      border: 0;
      border-bottom: 1px solid ${theme.colors.grey};
      margin: ${theme.spacing.large} 0;
      opacity: 0.3;
    `}
  />
);
