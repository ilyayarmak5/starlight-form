import { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import PaymentForm from "./PaymentForm";
import { LayoutHeader, LayoutBody, FormDivider } from "./Layout";
import StepIndicator from "./StepIndicator";
import theme from "../theme";
import FacebookLogo from "./FacebookLogo";

const donationAmounts = [
  {
    amount: 78,
    description: "Brightens the hospital experience for two children",
  },
  {
    amount: 100,
    description: "Provides arts & crafts for five hospitalised children",
  },
  {
    amount: 234,
    description: "Will deliver a fun day out for three Starlight families",
  },
];

export default ({
  buttons,
  setStep,
  submissionError,
  successMessage,
  token,
}) => {
  const { values, setFieldValue } = useFormikContext();
  if (successMessage) {
    return (
      <div>
        <LayoutHeader>
          <h1>Join Us</h1>
          <StepIndicator step={5} totalSteps={4} setStep={setStep} />
        </LayoutHeader>
        <LayoutBody>
          <h2
            css={css`
              margin-bottom: ${theme.spacing.large};
              font-weight: 300;
            `}
          >
            You're in!
          </h2>
          <p
            css={css`
              margin-bottom: ${theme.spacing.medium};
              text-align: center;
              font-size: 1rem;
            `}
          >
            Congratulations! You're signed up for Tour de Kids 2021!
          </p>
          <div
            css={css`
              text-align: center;
            `}
          >
            {typeof successMessage === "string" ? (
              <p
                css={css`
                  margin-bottom: ${theme.spacing.medium};
                  text-align: center;
                  font-size: 1.25rem;
                  font-weight: normal !important;
                `}
              >
                We've just sent you an email to activate your account. Be sure
                to do this right away to be able to log into your challenge hub
                and access exclusive event merch. If you can't find the email,
                don't forget to check your junk folder!
              </p>
            ) : (
              <button
                className="button button--standard button--primary"
                css={css`
                  margin: 0.75rem auto 1.5rem;
                  font-size: 20px;
                  display: inline-block;
                  position: relative;
                  padding-left: 2rem;
                  padding-right: 3rem;
                  &:before {
                    background: url(https://raisely-images.imgix.net/tourdekids-2020/uploads/path-21-svg-b485f5.svg)
                      no-repeat;
                    background-size: contain;
                    position: absolute;
                    right: 20px;
                    top: 17px;
                    content: "";
                    display: block;
                    width: 10px;
                    height: 14px;
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  window.parent.postMessage(
                    { success: true, accessToken: token },
                    "*"
                  );
                }}
              >
                Go to my fundraising hub
              </button>
            )}
          </div>
          <p
            css={css`
              margin-bottom: ${theme.spacing.medium};
              text-align: center;
              font-size: 1rem;
            `}
          >
            Once you're logged in, don't forget to connect your Strava account
            and download our top tips and resources to kickstart your
            fundraising for sick kids.
          </p>
          <p
            css={css`
              margin-bottom: ${theme.spacing.medium};
              text-align: center;
              font-size: 1rem;
            `}
          >
            Thanks for choosing to take part in this year's challenge - you're a
            legend!
          </p>
        </LayoutBody>
      </div>
    );
  }
  return (
    <div>
      <LayoutHeader>
        <h1>Join Us</h1>
        <StepIndicator step={4} totalSteps={4} setStep={setStep} />
      </LayoutHeader>
      <LayoutBody>
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: ${theme.spacing.large};
          `}
        >
          Kickstart your fundraising
        </h2>
        {/* <p
          css={css`
            text-align: center;
            font-size: 1rem;
            padding: 0 5%;
            margin: 0 0 2rem;
          `}
        >
          Why not make the first donation on your fundraising page now, and get
          an exclusive Tour de Kids neck warmer! Plus you'll be setting the bar
          for your potential sponsors - people who sponsor themselves raise 2.5
          times more on average than someone who doesn't.
        </p> */}
        <div
          css={css`
            display: flex;
            border: 2px solid #49388714;
            border-radius: 8px;
            padding: 1rem;
            vertical-align: middle;
            align-items: center;
            p {
              margin-bottom: 25px;
            }
            b {
              font-weight: 800;
              color: ${theme.colors.purple};
            }

            img {
              width: 100px;
              margin-left: 30px;
            }

            @media screen and (max-width: 500px) {
              flex-direction: column;

              img {
                margin: 0;
              }
            }
          `}
        >
          <div>
            <p>
              Why not make a personal donation now to kickstart your fundraising
              and show everyone how commited you are? Plus you'll be setting the
              bar for your sponsors - people who sponsor themselves raise{" "}
              <b>2.5 times</b> more (on average) than those who don't.
            </p>
            <p>
              <b>Sponsor yourself right now</b> and grab a pair of these
              exclusive Go BIG socks!
            </p>
            <p>
              Plus, raise <b>$300</b> before <b>31 October</b> and receive your
              Go BIG pack to wear during the challenge!
            </p>
          </div>
          <img
            src="https://raisely-images.imgix.net/tour-de-kids-2021/uploads/neck-warmer-mockup-red-png-426f34.png"
            alt="Tour de kids neck warmer"
          />
        </div>
        <div
          css={css`
            display: flex;
            margin-top: ${theme.spacing.medium};
            margin-bottom: ${theme.spacing.medium};
            @media (max-width: 450px) {
              flex-direction: column;
            }
          `}
        >
          {donationAmounts.map(({ amount: a, description }) => (
            <DollarHandle
              key={a}
              onClick={(e) => {
                e.preventDefault();
                setFieldValue("basket.donationAmount", a);
              }}
              amount={a}
              description={description}
              selected={values.basket.donationAmount === a}
            />
          ))}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: ${theme.spacing.medium};
            padding: ${theme.spacing.medium};
            border-radius: 5px;
          `}
        >
          <p
            css={css`
              font-size: 1.2rem;
              color: ${theme.colors.text};
              flex: 1;

              @media (max-width: 450px) {
                font-size: 1.2rem;
              }
            `}
          >
            Or choose your own amount
          </p>
          <span
            css={css`
              position: relative;
              margin-left: ${theme.spacing.medium};
            `}
          >
            <input
              type="number"
              onChange={(e) =>
                setFieldValue(
                  "basket.donationAmount",
                  Number(e.target.value) || ""
                )
              }
              value={values.basket.donationAmount}
              size="1"
              css={css`
                margin-right: ${theme.spacing.medium};
                font-size: 1.8rem;
                color: ${theme.colors.grey};
                width: 150px;
                border: 2px solid ${theme.colors.grey};
                background: white;
                border-radius: 8px;
                padding: ${theme.spacing.medium};
                font-weight: 800;
                padding-left: 2rem;

                @media (max-width: 450px) {
                  margin-right: 0;
                  width: 110px;
                }
              `}
            />
            <span
              css={css`
                position: absolute;
                top: 16px;
                left: 15px;
                font-weight: 800;
                color: ${theme.colors.grey};
                font-size: 1.8rem;
              `}
            >
              $
            </span>
          </span>
        </div>
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: ${theme.spacing.large};
          `}
        >
          Your payment
        </h2>
        <PaymentForm submissionError={submissionError} />
        <button
          onClick={() => {
            setFieldValue("basket.donationAmount", 0);
            setFieldValue("basket.optIn", false);
          }}
          type="submit"
          id="complete-without-payment"
          css={css`
            display: block;
            text-align: center;
            background: none;
            border: 0;
            padding: 0;
            margin: 0 auto;
            font-size: 1.2rem;
            text-decoration: underline;
            margin-top: 25px;
            color: ${theme.colors.pink};
            font-weight: 800;
          `}
        >
          Skip this step and complete registration &gt;
        </button>
        {/* {buttons} */}
      </LayoutBody>
    </div>
  );
};

export const Step4Schema = Yup.object().shape({});

export const Step4AsyncValidation = null;

function DollarHandle({ amount, description, selected, onClick }) {
  return (
    <button
      //   css={css`
      //     flex: 1;
      //     ${selected && `border:1px solid red;`}
      //     margin-right: ${theme.spacing.small};
      //     padding: ${theme.spacing.medium};
      //     border-radius: 5px;
      //     background: white;
      //     border: 2px solid ${theme.colors.text};
      //     color: ${theme.colors.text};
      //     transition: 0.1s ease-in-out;
      //     will-change: color, background;
      //     &:hover {
      //       border-color: ${theme.colors.purple};
      //       color: ${theme.colors.purple};
      //     }
      //     ${selected &&
      //     `
      //   border-color: ${theme.colors.purple};
      //   color: ${theme.colors.purple};
      //     `};
      //     &:last-of-type {
      //       margin-right: 0;

      //       @media (max-width: 450px) {
      //         margin-right: ${theme.spacing.small};
      //       }
      //     }
      //     @media (max-width: 450px) {
      //       flex-direction: column;
      //       margin-top: 0;
      //       margin-bottom: ${theme.spacing.small};
      //       margin-right: ${theme.spacing.small};
      //       align-items: center;
      //     }
      //   `}
      css={css`
        flex: 1;
        border: 2px solid ${theme.colors.lightGreen};
        margin-right: ${theme.spacing.small};
        padding: ${theme.spacing.medium};
        border-radius: 8px;
        background: white;
        transition: 0.1s ease-in-out;
        will-change: color, background;
        color: #656565;
        outline: none;
        position: relative;
        padding-bottom: 20px;
        overflow: visible;

        h2 {
          color: ${theme.colors.purple};
          font-weight: 400;
        }

        ${selected &&
        `
	  border-width: 2;
	  box-shadow: inset 0 0 0 3px ${theme.colors.pink};
	  border-color: ${theme.colors.pink};
	  padding-bottom: 20px;

	  h2 {
		  color: ${theme.colors.pink};
		  font-weight: 800;
	  }

	  &:after {
		background-image: url(https://raisely-images.imgix.net/tourdekids-2020/uploads/group-png-4513ff.png);
		background-size: 50% auto;
		background-position: center center;
		background-repeat: no-repeat;
		background-color: ${theme.colors.lightGreen};
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
        @media (max-width: 450px) {
          flex-direction: column;
          margin-top: 0;
          margin-bottom: 30px;
          align-items: center;

          &:after {
            background-size: 100px auto;
          }
        }
      `}
      onClick={onClick}
    >
      <h2
        css={css`
          margin: 20px 0 ${theme.spacing.medium} 0;
          color: inherit;
        `}
      >
        ${amount}
      </h2>
      <p
        css={css`
          margin: ${theme.spacing.small} 0;
        `}
      >
        {description}
      </p>
    </button>
  );
}
