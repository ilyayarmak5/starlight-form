/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useEffect } from "react";
import * as Yup from "yup";
import Path from "./inputs/Path";
import Text from "./inputs/Text";
import { useFormikContext } from "formik";
import TextArea from "./inputs/TextArea";
import Image from "./inputs/Image";
import Number from "./inputs/Number";
import { LayoutHeader, LayoutBody, FormDivider } from "./Layout";
import StepIndicator from "./StepIndicator";
import theme from "../theme";

export default ({ buttons, setStep }) => {
  const { values, setFieldValue } = useFormikContext();
  useEffect(() => {
    // Set some default values, contingent on answers from previous steps
    if (!values.profileName) {
      setFieldValue("profileName", `${values.firstName} ${values.lastName}`);
    }

    if (!values.profileDescription) {
      setFieldValue(
        "profileDescription",
        `I'm taking part in Starlight’s Go BIG challenge to raise money for sick kids. (etc.)`
      );

      setFieldValue(
        "teamDescription",
        `Our team is taking part in Starlight’s Go BIG challenge to raise money for sick kids. (etc.)`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <LayoutHeader>
        <h1
          css={css`
            color: ${theme.colors.lightGreen};
            font-weight: 800;
            font-size: 3rem;
          `}
        >
          JOIN US
        </h1>
        <StepIndicator step={3} totalSteps={4} setStep={setStep} />
      </LayoutHeader>
      <LayoutBody>
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: ${theme.spacing.large};
          `}
        >
          Create your Page
        </h2>
        <p
          css={css`
            text-align: center;
            margin-bottom: ${theme.spacing.large};
            font-size: 1rem;
            padding: 0 5%;
            color: ${theme.colors.text};
          `}
        >
          To help you fundraise, we'll set up a fundraising page for you as part
          of your registration. You can personalise it now, or update it later.
        </p>
        <Text label="Name on your page" name="profileName" />
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: 25px;
          `}
        >
          Profile photo
        </h2>
        <div
          css={css`
            margin-top: ${theme.spacing.medium};
            margin-bottom: ${theme.spacing.medium};
          `}
        >
          <Image name="profileImage" label="" />
        </div>
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: 25px;
          `}
        >
          Make it personal
        </h2>
        <p
          css={css`
            font-size: 1rem;
            margin-bottom: 20px;
            text-align: center;
            padding: 0 5%;
          `}
        >
          Write a short blurb about yourself and why you’re taking part. We’ve
          added some suggested wording to get you started.
        </p>
        <TextArea name="profileDescription" />
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
            margin-bottom: ${theme.spacing.large};
          `}
        >
          Set your fundraising goal
        </h2>
        <p
          css={css`
            font-size: 1rem;
            margin-bottom: ${theme.spacing.large};
            text-align: center;
            padding: 0 5%;
          `}
        >
          How much are you hoping to raise?
        </p>
        <Number name="profileGoal" prepend="$" large />
        <FormDivider />
        <h2
          css={css`
            font-weight: 800;
          `}
        >
          Your page URL
        </h2>
        <div
          css={css`
            ${theme.mixins.pathWidget}
          `}
        >
          <p
            css={css`
              font-size: 1rem;
              margin-top: ${theme.spacing.medium};
              margin-bottom: ${theme.spacing.medium};
              text-align: center;
              padding: 0 5%;
            `}
          >
            If you want to edit your suggested page url below, please use only
            letters, numbers and hyphens.
          </p>
          <Path
            name="profilePath"
            suggestName={`${values.firstName} ${values.lastName}`}
          />
        </div>
        {values.teamSetting === "newTeam" && (
          <div
            css={css`
              ${theme.mixins.pathWidget}
            `}
          >
            <h2
              css={css`
                font-weight: 300;
                text-align: center;
                margin-top: 1.5rem;
              `}
            >
              Your team page URL
            </h2>
            <p
              css={css`
                font-size: 1rem;
                margin-top: ${theme.spacing.medium};
                margin-bottom: ${theme.spacing.medium};
                text-align: center;
                padding: 0 5%;
              `}
            >
              Because you're setting up a new team, you also have a team
              fundraising page. Please choose your team's fundraising URL.
            </p>
            <Path name="teamPath" suggestName={values.teamName} />
          </div>
        )}
        {buttons}
      </LayoutBody>
    </div>
  );
};

export const Step3Schema = Yup.object().shape({
  profileName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  profileDescription: Yup.string(),
  profileImage: Yup.string(),
  profileGoal: Yup.number(),
  profilePath: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .test("pending", "_pending", (val) => val !== "_pending")
    .test(
      "invalid",
      "That page URL is already taken. Please try again.",
      (val) => val !== "_invalid"
    )
    .test(
      "invalid-characters",
      "Your URL can only use letters numbers and hyphens",
      (val) => /^[0-9A-Za-z-_]+$/.test(val)
    ),
  teamPath: Yup.string().when(["teamSetting"], {
    is: (teamSetting) => teamSetting === "newTeam",
    then: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .test("pending", "_pending", (val) => val !== "_pending")
      .test(
        "invalid",
        "That page URL is already taken. Please try again.",
        (val) => val !== "_invalid"
      )
      .test(
        "invalid-characters",
        "Your URL can only use letters numbers and hyphens",
        (val) => /^[0-9A-Za-z-_]+$/.test(val)
      )
      .notOneOf(
        [Yup.ref("profilePath")],
        "Your team URL can't be the same as your personal page URL"
      ),
  }),
});
