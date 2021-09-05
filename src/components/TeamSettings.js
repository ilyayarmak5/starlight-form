/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as Yup from "yup";
import RadioSingle from "./inputs/RadioSingle";
import { useFormikContext } from "formik";
import Text from "./inputs/Text";
import CheckboxSingle from "./inputs/CheckboxSingle";
import TeamFinder from "./inputs/TeamFinder";
import theme from "../theme";

export default () => {
	const { values } = useFormikContext();
	return (
		<div>
			<RadioSingle
				name="teamSetting"
				value="individual"
				label="On my own (you can join a team later if you wish)"
				showErrors={false} // Errors shown on the last radio item instead
				closeUi={true}
			/>
			<div
				css={css`
					${values.teamSetting === "join" &&
					`
            border-color: ${theme.colors.purple};
            opacity: 1;
            border-radius: 5px;
          `}
					margin-top: ${theme.spacing.medium};
					margin-bottom: ${theme.spacing.medium};
				`}
			>
				<RadioSingle
					name="teamSetting"
					value="join"
					label="I want to join an existing team"
					showErrors={false} // Errors shown on the last radio item instead
				/>
				{values.teamSetting === "join" && (
					<div
						css={css`
							padding: ${theme.spacing.medium};
							padding-top: 0;
							padding-left: 42px; /* Line up with radio button */
							border: 2px solid ${theme.colors.purple};
							border-radius: 10px;
							border-top: none;
							border-top-right-radius: 0;
							border-top-left-radius: 0;
							margin-top: -5px;
						`}
					>
						<TeamFinder name="joinTeam" label="Find your team" />
					</div>
				)}
			</div>
			<div
				css={css`
					${values.teamSetting === "newTeam" &&
					`
            border-color: ${theme.colors.purple};
            opacity: 1;
            border-radius: 5px;
          `}
					margin-top: ${theme.spacing.medium};
					margin-bottom: ${theme.spacing.medium};
				`}
			>
				<RadioSingle
					name="teamSetting"
					value="newTeam"
					label="I want to set up a new team"
				/>
				{values.teamSetting === "newTeam" && (
					<div
						css={css`
							padding: ${theme.spacing.medium};
							padding-top: 0;
							padding-left: 42px; /* Line up with radio button */
							border: 2px solid ${theme.colors.purple};
							border-radius: 10px;
							border-top: none;
							border-top-right-radius: 0;
							border-top-left-radius: 0;
							margin-top: -5px;
						`}
					>
						<Text name="teamName" label="Team Name" />
						<CheckboxSingle
							name="teamWork"
							largeCheckbox
							label={
								<span>
									<b>
										I'm taking on the challenge with my
										workmates.
									</b>
								</span>
							}
							css={css`
								margin-top: ${theme.spacing.medium};
							`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export const TeamSettingsSchema = Yup.object().shape({
	teamSetting: Yup.string().required("Required"),
	joinTeam: Yup.object().when(["teamSetting"], {
		is: (teamSetting) => teamSetting === "join",
		then: Yup.object().shape({
			uuid: Yup.string().required("Required"),
		}),
	}),
	teamName: Yup.string().when(["teamSetting"], {
		is: (teamSetting) => teamSetting === "newTeam",
		then: Yup.string().required("Required"),
	}),
});

export const TeamSettingsAsyncValidation = null;
