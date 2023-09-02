import { useState, useEffect, useRef } from "react";

import IconCalendar from "assets/icons/icon-calendar.svg";
import propTypes from "prop-types";
import { DateRange } from "react-date-range";
import formatDate from "utils/formatDate";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const InputDate = ({ value, placeholder, name, onChange, outerClassName }) => {
	const refDatePicker = useRef(null);
	const [isShown, setIsShown] = useState(false);

	const handleChange = (eventValue) => {
		const target = {
			target: {
				value: eventValue.selection,
				name: name,
			},
		};

		onChange(target);
	};

	const handleClickOutside = (event) => {
		if (refDatePicker && !refDatePicker.current.contains(event.target)) {
			setIsShown(false);
		}
	};

	const check = (focus) => focus.indexOf(1) < 0 && setIsShown(false);

	const displayDate = `${value.startDate ? formatDate(value.startDate) : ""}${
		value.endDate ? ` - ${formatDate(value.endDate)}` : ""
	}`;

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	return (
		<div
			ref={refDatePicker}
			className={[
				"date-picker-wrapper flex group mb-3 p-6",
				outerClassName,
			].join(" ")}>
			<div className="bg-white">
				<div>
					<span className="group-hover:cursor-pointer border-0 p-0 rounded-[4px] w-[45px] h-[45px] -bg--primary-dark absolute z-50 flex justify-center items-center">
						<img src={IconCalendar} alt="icon calendar" />
					</span>
				</div>

				<input
					type="text"
					readOnly
					className="input-date group-hover:cursor-pointer border-0 outline-0 shadow-none -bg--gray-100 py-[.575rem] px-[45px] text-center justify-center w-full h-[45px] rounded-[4px]"
					value={displayDate}
					placeholder={placeholder}
					onClick={() => setIsShown(!isShown)}
				/>

				{isShown && (
					<div className="date-picker-wrapper p-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] absolute rounded-[4px] top-[45px] z-[5]">
						<DateRange
							editableDateInputs={true}
							onChange={handleChange}
							moveRangeOnFirstSelection={false}
							onRangeFocusChange={check}
							ranges={[value]}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

InputDate.propTypes = {
	value: propTypes.object,
	onChange: propTypes.func,
	placeholder: propTypes.string,
	outerClassName: propTypes.string,
};

export default InputDate;