/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useFormikContext } from "formik";
import {
  calculateTotalWithOptIn,
  formatValue,
  calculateOptInAmount,
} from "./Basket";
import Stripe from "./inputs/Stripe";
import theme from "../theme";
import CheckboxSingle from "./inputs/CheckboxSingle";
import { Lock } from "@material-ui/icons";

const Tooltip = ({ children, tooltipContent }) => {
  return (
    <span
      css={css`
        position: relative;
        color: ${theme.colors.pink};
        text-decoration: underline;
        & div {
          opacity: 0;
          pointer-events: none;
        }
        &:hover div {
          opacity: 1;
          pointer-events: all;
        }
      `}
    >
      {children}
      <div
        css={css`
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          background: black;
          color: white;
          font-size: 0.7rem;
          padding: ${theme.spacing.small};
          border-radius: 5px;
          text-align: center;
          transition: opacity 0.3s ease-in-out;
          &:after {
            content: "";
            border-top: 5px solid black;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
        `}
      >
        {tooltipContent}
      </div>
    </span>
  );
};

export default ({ submissionError }) => {
  const { values, isSubmitting } = useFormikContext();
  const total = calculateTotalWithOptIn(values.basket);
  return (
    <div>
      <div
        css={css`
          border: 3px solid ${theme.colors.grey};
          padding: ${theme.spacing.medium};
          border-radius: 10px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        `}
      >
        <Stripe />
      </div>
      <div
        css={css`
          background: ${theme.colors.grey};
          padding: ${theme.spacing.medium};
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: ${theme.spacing.medium};
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          color: white;
        `}
      >
        Payment securely processed by STRIPE
        <Lock
          css={css`
            margin-left: auto;
          `}
        />
      </div>

      <CheckboxSingle
        name="basket.optIn"
        largeCheckbox
        label={
          <span>
            <b>
              Add {formatValue(calculateOptInAmount(values.basket).optInAmount)}{" "}
              to help cover our{" "}
              <Tooltip tooltipContent="Adding this small percentage will help Raisely, a for-purpose giving platform, cover our website and platform costs.">
                fundraising costs
              </Tooltip>{" "}
            </b>
          </span>
        }
        css={css`
          margin-bottom: ${theme.spacing.medium};
        `}
      />
      {submissionError && (
        <span
          css={css`
            ${theme.mixins.error}
            margin-bottom: ${theme.spacing.small};
          `}
        >
          <i className="material-icons">warning</i>
          {submissionError}
        </span>
      )}
      <button
        className="button button--standard button--primary"
        disabled={isSubmitting}
        id={`complete-with-payment`}
        css={css`
          width: 100%;
          display: block;
          margin-top: 2rem;
          line-height: 1.4;
          padding-top: 15px;
          padding-bottom: 15px;
          background: ${theme.colors.pink};
          border-radius: 5px;
          //   display: flex;
          //   align-items: center;
          //   justify-content: center;
        `}
      >
        {isSubmitting
          ? "Loading..."
          : `Pay ${formatValue(total)} now and complete registration `}
        {/* {!isSubmitting && (
          <p
            css={css`
              font-size: 1.5em;
              padding-left: 10px;
            `}
          >
            &gt;
          </p>
        )} */}
      </button>
    </div>
  );
};
