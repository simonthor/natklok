import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import ReactReveal from "react-reveal/Fade";

import { FaChild, FaMale } from "react-icons/fa";
import { MdElderly } from "react-icons/md";

// Custom components
import AlignCenter from "components/AlignCenter";
import StyledButton from "components//StyledButton";
import Title from "components/typeography/Title";
import SmallText from "components/typeography/SmallText";
import IconButton from "components/IconButton";
import StyledSlider from "components/StyledSlider";

const AgeSlide = ({ t, nextSlide }) => {
	const [age, setAge] = useState("");
	const [internetExperience, setInternetExperience] = useState(0);

	return (
		<AlignCenter centerBothAxis>
			<ReactReveal>
				<Grid
					container
					direction="column"
					xs={12}
					style={{ textAlign: "center", margin: "0 0 20px 0" }}
				>
					<p style={{ margin: 0, fontWeight: "bold" }}>
						Vilken åldersgrupp tillhör du?
					</p>
				</Grid>
				<Grid container alignItems="center" justify="center">
					<Grid item xs={12} lg={12}>
						<IconButton
							name="youth"
							type="singleChoice"
							isChecked={age === "youth"}
							handleClick={setAge}
							icon={
								<FaChild
									style={{
										height: "0.8em",
										padding: "0.1em 0",
									}}
								/>
							}
							color="#D16BA5"
							label="Barn / Ungdom"
							darkTextOnClick={true}
							rightAlignedLabel={"hi"}
						/>
						<IconButton
							name="adult"
							type="singleChoice"
							isChecked={age === "adult"}
							handleClick={setAge}
							icon={<FaMale />}
							color="#86A8E7"
							label="Vuxen"
							darkTextOnClick={true}
						/>
						<IconButton
							name="senior"
							type="singleChoice"
							isChecked={age === "senior"}
							handleClick={setAge}
							icon={<MdElderly />}
							color="#5FFBF1"
							label="Senior"
							darkTextOnClick={true}
						/>
					</Grid>
					<Grid
						container
						direction="column"
						xs={12}
						style={{
							textAlign: "center",
							paddingRight: 8,
							marginTop: 2,
						}}
					>
						<SmallText opacity>
							Sättet som testet utformas anpassas efter din ålder.
						</SmallText>
						<StyledButton
							onClick={nextSlide}
							caps
							style={{ marginBottom: 24 }}
						>
							{t("general.next")}
						</StyledButton>
						<StyledSlider
							ariaLabel="Internet"
							defaultValue={internetExperience}
							handleChange={(e) =>
								setInternetExperience(e.target.value)
							}
							step={1}
							min={0}
							max={6}
						/>
					</Grid>
				</Grid>
			</ReactReveal>
		</AlignCenter>
	);
};

export default withTranslation("common")(AgeSlide);
