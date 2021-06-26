const MONTHS = [
  {
		name: 'Jan',
		id: '0'
	},
  {
		name: 'Feb',
		id: '1'
	},
  {
		name: 'March',
		id: '2'
	},
  {
		name: 'Apr',
		id: '3'
	},
  {
		name: 'May',
		id: '4'
	},
  {
		name: 'Jun',
		id: '5'
	},
  {
		name: 'Jul',
		id: '6'
	},
  {
		name: 'Aug',
		id: '7'
	},
  {
		name: 'Sept',
		id: '8'
	},
  {
		name: 'Oct',
		id: '9'
	},
  {
		name: 'Nov',
		id: '10'
	},
  {
		name: 'Dec',
		id: '11'
	},
]

const getNameDay = day => (
	new Intl.DateTimeFormat('en-US', {
	weekday: "short"
	}).format(day)
);

const getWeekDays = () => {
	const date = [1, 2, 3 ,4, 5 , 6, 7].map((day) => getNameDay(new Date(2018, 0, day)));
	return date;
} 

const WEEKDAYS = getWeekDays();

export {
	MONTHS,
	WEEKDAYS
}