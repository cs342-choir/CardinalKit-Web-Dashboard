<template>
  <div class="date-picker">
    <label class="alt-datetime-wrapper">
			<span v-if="label" class="block">{{label}}</span>
			<input autocomplete="off" class="alt-datetime-wrapper__input" placeholder="--/--/--" type="text" name="datetime" v-model="date"/>
		</label>
		<div v-if="showPopup" class="alt-popup">
			<div v-if="!calendar" class="alt-date"> 
				<div class="alt-date-group">
					<label class="alt-date-group__label" for="days">Day: </label>
					<select @change="handleChangeDate" name="days" v-model="today" id="days">
						<option v-for="(day, index) in days" :key="index + 'alt'" :value="day.day">{{day.day}}</option>
					</select>
				</div>
				<div class="alt-date-group">
					<label class="alt-date-group__label" for="months">Month: </label>
					<select @change="handleChangeDate" name="month" v-model="currentMonth" id="months">
						<option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
					</select>
				</div>
				<div class="alt-date-group">
					<label class="alt-date-group__label" for="years">Year: </label>
					<select @change="handleChangeDate" name="year" v-model="currentYear" id="years">
						<option v-for="(year, index) in years" :key="index + 'alt'" :value="year">{{year}}</option>
					</select>
				</div>
			</div>
			<div v-else class="alt-calendar">

				<div class="alt-calendar-header">
					<div>
						<select class="alt-calendar-header__months" @change="handleChangeDate" name="month" v-model="currentMonth" id="months">
							<option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
						</select>
						<select class="alt-calendar-header__years" @change="handleChangeDate" name="year" v-model="currentYear" id="years">
							<option v-for="(year, index) in years" :key="index + 'alt'" :value="year">{{year}}</option>
						</select>
					</div>
				</div>

				<div class="alt-calendar-body">
					<ul class="alt-calendar-body__weekdays">
						<li v-for="(day, index) in WEEKDAYS" :key="day" :value="index + 1">
							{{day}}
							<template v-for="(dayw, indexw) in getDaysOfWeek(index)" :key="indexw+'dow'">
								<!-- <pre>{{dayw.calendarDay}} {{}}</pre> -->
								<template v-if="dayw.calendarDay === index">
									<span class="block" v-if="dayw.calendarDay === index" :value="dayw.day">{{dayw.day}}</span>
								</template>
							</template>
						</li>
					</ul>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { MONTHS, WEEKDAYS } from './const';

export default {
props: {
	label: String,
	showPopup: Boolean,
	modelValue: Date,
	calendar: Boolean
},
emits: ['update:modelValue', 'changeDate'],
setup(props, ctx)  {
	const date = computed(()  => `${today.value}/${Number(currentMonth.value) + 1}/${currentYear.value}`);
	const today = ref(new Date().getUTCDate());
	const currentMonth = ref(new Date().getUTCMonth());
	const currentYear = ref(new Date().getUTCFullYear());
	const days = computed(() => getDayperMonthsandYear(currentYear.value, currentMonth.value));
	// const daysPerWeek = computed({ set: (numberWeek) => days.value.filter((day) => day.calendarDay === numberWeek) });
	const months = ref(MONTHS);
	const years = computed(() => generateSelectableYears(currentYear.value));

	onMounted(() => handleChangeDate());

	function getDayperMonthsandYear(year, month) {
			const days = new Date(year, Number(month) + 1, 0).getDate();
			return [...Array(days).keys()].map((day) => getDayofWeek(year, Number(month) + 1, day));
	}

	function getDayofWeek(year, month, day) {
		const calendarDay = new Date(year, month, day).getDay();
		return {day: day + 1, calendarDay }
	}

	function generateSelectableYears(year) {
		const countYears = 10;
		const initYear = year - 3;
		return [...Array(countYears).keys()].map((index) => index + initYear);
	}

	function getDaysOfWeek(numberWeek) {
		return days.value.filter((day) => day.calendarDay === numberWeek);
	}

	function handleChangeDate() {
		const date = new Date(currentYear.value, currentMonth.value, today.value);
		ctx.emit('update:modelValue', date)
		ctx.emit('changeDate', date)
	}

	watchEffect(() => {
		if(props.modelValue) {
			today.value = props.modelValue?.getUTCDate();
			currentMonth.value = props.modelValue?.getUTCMonth();
			currentYear.value = props.modelValue?.getUTCFullYear();
		}
	});

	return {
		currentMonth,
		months,
		today,
		days,
		years,
		currentYear,
		date,
		handleChangeDate,
		WEEKDAYS,
		// daysPerWeek,
		getDaysOfWeek
	}
}
}
</script>

<style lang="scss" scoped>
.date-picker {
	position: relative;
}
.alt-popup {
	display: inline-block;
	padding: 1rem;
	background: white;
	border-radius: 3px;
	margin-top: 15px;
	position: absolute;
	top: 55px;
  left: 0;
	z-index: 2;

  &:before {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    top: -6px;
    content: "";
    height: 0;
    left: 50%;
    margin-left: -6px;
    position: absolute;
    width: 0;
  }
}

.alt-date {
	display: flex;
	gap: 10px;

  &-group {
    &__label {
      display: block;
      margin-bottom: 5px;
    }

    select {
      padding: .2rem;
      border: none;
      border-radius: 3px;
      background: #f7f7f7;
    }
  }
}
.alt-datetime-wrapper {
	&__input {
		padding: .5rem;
		border: solid 2px lightgrey;
		border-radius: 3px;
		font-size: 13pt;
		display: inline-block;

		&::placeholder {
			color: darkgrey;
			opacity: 1;
		}
	}
}

.alt-calendar {
	&-header {
		div {
			display: flex;
			gap: 10px;
			justify-content: center;

		}
		&__months, &__years {
			padding: .5rem;
			width: 100%;
			border: none;
			border-radius: 3px;
			outline: none;
			background: #f7f7f7;
		}
	}

	&-body {
		&__weekdays {
			list-style: none;
			padding: .5rem;
			display: grid;
			gap: 10px;
			grid-template-columns: repeat(7, 1fr);
		}
	}
}
</style>