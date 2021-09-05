/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import theme from "../theme";
import { Check } from "@material-ui/icons";

const Step = ({ number, current, complete, onClick }) => {
  const imageUrl = complete
    ? "/Step Indicator Complete.png"
    : "/Step Indicator.png";
  return (
    <div
      onClick={onClick}
      css={css`
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid ${theme.colors.purple};
        border-radius: 100px;
        padding-top: 0;
        font-size: 1.2rem;
        line-height: 30px;
        color: ${theme.colors.purple};
        margin: 32px 0 0;
        font-weight: 600;
        ${!complete && !current && `border-color: ${theme.colors.grey};`}
        ${!complete && !current && `color: ${theme.colors.grey};`}
		${complete &&
        `background: url(https://raisely-images.imgix.net/tourdekids-2020/uploads/path-22-png-c9366e.png) ${theme.colors.purple} center center no-repeat;`}
		${complete && `background-size: 50% auto;`}
		${complete && `font-size: 0;`}
        ${onClick && `cursor: pointer;`}
        ${number !== 1 &&
        `
					margin-left: 30px;
					position: relative;
					&:before {
						content: '';
						position: absolute;
						left: -28px;
						top: calc(50% - 1px);
						width: 20px;
						height: 3px;
						background: ${theme.colors.grey};
					}
        `}
        
        @media (max-width: 768px) {
          background-color: white;
          ${complete && `background-color: ${theme.colors.purple};`}
        }
      `}
    >
      {number}
    </div>
  );
};

export default ({ step, totalSteps, setStep }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      {[...new Array(totalSteps)].map((_, ix) => (
        <Step
          key={ix}
          number={ix + 1}
          current={ix + 1 === step}
          complete={ix + 1 < step}
          onClick={ix + 1 < step ? () => setStep(ix) : null}
        />
      ))}
    </div>
  );
};
