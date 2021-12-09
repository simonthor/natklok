import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const IconButton = ({
	name,
	isChecked,
	handleClick,
	icon,
	checkedIcon = null,
	color,
	darkTextOnClick = false,
	label,
	width = "100%",
	style,
}) => {
	return (
		<div
			style={{
				background: isChecked ? color : "rgba(0, 0, 0, 0.2)",
				borderRadius: 12,
				border: isChecked
					? "4px solid rgba(0, 0, 0, 0.2)"
					: "4px solid transparent",
				width: width,
				padding: 0,
				color: isChecked
					? darkTextOnClick
						? "rgba(0, 0, 0, 0.7)"
						: "rgba(255, 255, 255, 0.8)"
					: "white",
				boxSizing: "border-box",
				transition: "all 0.2s",
				margin: "7px 0",
				...style,
			}}
		>
			<FormControlLabel
				control={
					<Checkbox
						checked={isChecked}
						onChange={() => handleClick(name)}
						name={name}
						icon={icon}
						checkedIcon={checkedIcon || icon}
						style={{
							color: isChecked ? "rgba(0,0,0,0.7" : "white",
						}}
					/>
				}
				style={{ paddingLeft: 5, marginLeft: 0, width: "100%" }}
				label={label}
			/>
		</div>
	);
};

export default IconButton;
