/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import * as Yup from "yup";
import { LayoutHeader, LayoutBody } from "./Layout";
import theme from "../theme";
import { useFormikContext } from "formik";
import CustomDistanceInput from "./inputs/CustomDistanceInput";
import StepIndicator from "./StepIndicator";

export default ({ buttons, setStep }) => {
  const { values } = useFormikContext();

  console.log("values", values);

  return (
    <div>
      <LayoutHeader>
        <h1>Join Us</h1>
        <StepIndicator step={1} totalSteps={4} setStep={setStep} />
      </LayoutHeader>
      <LayoutBody>
        <h2
          css={css`
            margin-bottom: ${theme.spacing.large};
            font-weight: 300;

            span {
              color: #52288e;
              font-weight: 900;
            }
          `}
        >
          Choose your <span>Go BIG</span> challenge
        </h2>
        <p
          css={css`
            margin-bottom: 40px;
            text-align: center;
            font-size: 1rem;
            line-height: 1.4;

            span {
              color: ${theme.colors.purple};
              font-weight: 900;
            }
          `}
        >
          How far can you <span>WALK, RUN or ROLL</span> for sick kids from 15 -
          28 November?
        </p>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            padding: ${theme.spacing.medium} 0;
            margin-bottom: ${theme.spacing.medium};
            @media (max-width: 600px) {
              flex-direction: column;
            }
          `}
        >
          <ChallengeButton
            color={theme.colors.lightGreen}
            header="Big"
            distance={50}
            summary={() => (
              <React.Fragment>Roughly 6.6km a day for 30 days</React.Fragment>
            )}
            // overall="You've got this!"
          />
          <ChallengeButton
            color={theme.colors.lightGreen}
            header="Bigger"
            distance={75}
            summary={() => (
              <React.Fragment>Roughly 16.6km a day for 30 days</React.Fragment>
            )}
            // overall="Start pedalling!"
          />
          <ChallengeButton
            color={theme.colors.lightGreen}
            header="Biggest"
            distance={100}
            summary={() => (
              <React.Fragment>Roughly 33.3km a day for 30 days</React.Fragment>
            )}
            // overall="Get the wheels turning!"
          />
        </div>
        <CustomDistanceInput
          name="challengeDistance"
          css={css`
            margin-bottom: ${theme.spacing.large};
          `}
        />
        {/* <p
          css={css`
            text-align: right;
            font-size: 0.85rem;
            line-height: 1.4;
            width: 65%;
            margin: -2.5em auto 2.5em auto;
          `}
        >
          ({(values.challengeDistance / 30).toFixed(1)} kms a day for 30 days)
        </p> */}
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          {buttons}
        </div>
      </LayoutBody>
    </div>
  );
};

export const Step1Schema = Yup.object().shape({
  challengeDistance: Yup.number().required(),
});

export const Step1AsyncValidation = null;

function ChallengeButton({
  header,
  distance,
  summary: Summary,
  overall,
  highlighted,
  color,
}) {
  const { setFieldValue, values } = useFormikContext();
  const selected = values.challengeDistance === distance;
  return (
    <button
      css={css`
        flex: 1;
        border: 2px solid ${color};
        margin-right: ${theme.spacing.small};
        padding: ${theme.spacing.medium};
        border-radius: 25px;
        background: white;
        transition: 0.1s ease-in-out;
        will-change: color, background;
        color: #656565;
        outline: none;
        position: relative;
        padding-bottom: 20px;
        overflow: visible;

        padding-right: 0;
        padding-left: 0;

        @media screen and (max-width: 450px) {
          display: flex;
          padding-left: 0;
          padding-right: 0;
          box-sizing: content-box;
        }

        ${selected &&
        `
          border-width: 2;
          box-shadow: inset 0 0 0 5px ${theme.colors.pink};
		  border-color: ${theme.colors.pink};
          padding-bottom: 20px;


		  padding-right: 0;
		  padding-left: 0;

          &:after {
            background-image: url(https://raisely-images.imgix.net/tourdekids-2020/uploads/group-png-4513ff.png);
            background-size: 50% auto;
            background-position: center center;
            background-repeat: no-repeat;
            background-color: ${color};
            // border-bottom-right-radius: 15px;
            // border-bottom-left-radius: 15px;
			border-radius: 40px;
            content: '';
            display: block;
            width: 80%;
            height: 30px;
            position: absolute;
            bottom: -12px;
          }
        `};
        &:last-of-type {
          margin-right: 0;
        }
        @media (max-width: 600px) {
          margin: 0 0 50px 0;
        }
        @media (max-width: 450px) {
          flex-direction: column;
          margin: 0 0 50px 0;
          align-items: center;

          &:after {
            background-size: 100px auto;
            width: 50%;
            left: 25%;
          }
        }
      `}
      onClick={(e) => {
        e.preventDefault();
        setFieldValue("challengeDistance", distance);
      }}
    >
      <h4
        css={css`
          text-transform: uppercase;
          margin: 0;
          margin-bottom: ${theme.spacing.small};
          color: ${color};
          //   font-size: 0.8rem;
          font-size: 24px;
          font-weight: 900;
          display: inline-block;
          background: white;
          padding: 10px;
          width: auto;
          margin-top: -40px;
          overflow: visible;
          position: relative;
          z-index: 99;

          @media screen and (max-width: 450px) {
            font-size: 20px;
            margin-top: -36px;
          }
        `}
      >
        {header}
      </h4>
      <div
        css={css`
          //   width: calc(100% + 30px);
          position: relative;
          //   left: -15px;

          display: flex;
          justify-content: space-between;

          width: 100%;
          span {
            font-size: 0.5em;
            // position: relative;
            // top: 0.75em;
            border-bottom: 4px solid ${theme.colors.pink};
            width: 100%;
            height: 1px;
            display: block;
			margin-bottom: 5px;
          }

          div {
            max-width: 60%;
            width: 50%;
			display-flex;
			flex-direction: column;
          }
        `}
      >
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <h2
          css={css`
            font-weight: 800;
            font-size: 4rem;
            margin: -10px 0 5px;
            color: inherit;
            color: ${color};

            padding-left: 5px;
            padding-right: 5px;
            width: unset;

            span {
              // font-size: 0.5em;
              // position: relative;
              // top: 0.75em;
              border-top: 2px solid ${theme.colors.pink};
              min-width: 20%;
              width: 20%;
            }

            @media screen and (max-width: 600px) {
              font-size: 5rem;
            }
          `}
        >
          {distance}
        </h2>
        <div
          css={css`
            max-width: 60%;
          `}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p
        css={css`
          font-weight: 900;
          color: ${theme.colors.lightGreen};
          margin-bottom: 15px;
        `}
      >
        KM
      </p>
      <p
        css={css`
          font-size: 0.75rem;
          margin: ${theme.spacing.small} 0;
        `}
      >
        <Summary />
      </p>
      {/* <p
        css={css`
          font-size: 0.7rem;
          margin: ${theme.spacing.small} 0;
        `}
      >
        {overall}
      </p> */}
    </button>
  );
}
