/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useField, useFormikContext } from "formik";
import helpers from "./helpers";
import theme from "../../theme";

export default ({ name, className }) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { errorContent } = helpers("custom-distance", field, error, touched);

  return (
    <div className={className}>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: ${theme.spacing.medium};
          padding: 0 40px;
        `}
      >
        <p
          css={css`
            font-size: 1rem;
            color: ${theme.colors.text};
            flex: 1;

            @media (max-width: 768px) {
              font-size: 0.75rem;
            }
          `}
        >
          Or choose your own distance
        </p>
        <input
          type="number"
          {...field}
          onChange={(e) =>
            setFieldValue("challengeDistance", Number(e.target.value) || "")
          }
          size="1"
          css={css`
            margin-left: ${theme.spacing.medium};
            margin-right: ${theme.spacing.medium};
            font-size: 1.4rem;
            color: ${theme.colors.text};
            width: 100px;
            border: 2px solid ${theme.colors.text};
            background: white;
            border-radius: 15px;
            padding: 15px 10px 15px 15px;
            font-weight: bold;
          `}
        />
        <span
          css={css`
            font-size: 1.4rem;
            font-weight: bold;
            color: ${theme.colors.text};
          `}
        >
          KM
        </span>
      </div>
      {touched && error && (
        <span
          css={css`
            ${theme.mixins.error}
          `}
        >
          {errorContent}
        </span>
      )}
    </div>
  );
};
