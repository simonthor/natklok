import { Slider } from "@material-ui/core";

const StyledSlider = ({
	ariaLabel,
	defaultValue = 0,
	handleChange,
	valueLabelDisplay = "off",
	step,
	marks = true,
	min,
	max,
}) => {
	return (
		<Slider
			color="white"
			aria-label={ariaLabel}
			valueLabelDisplay={valueLabelDisplay}
			onChange={handleChange}
			defaultValue={0}
			step={step}
			marks={marks}
			size="medium"
			min={min}
			max={max}
		/>
	);
};

export default StyledSlider;
