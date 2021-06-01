<template>
  <div ref="divElement" class="alt-date">
		<label class="alt-datetime-wrapper">
			<input autocomplete="off" class="alt-datetime-wrapper__input" placeholder="--/--/--" type="date" name="date" v-model="date"/>
		</label>
		<div v-if="showPopup" class="alt-popup">
			<div class="alt-calendar">
				<div class="alt-calendar-group">
					<label for="days">Day: </label>
					<select name="days" v-model="today" id="days">
						<option v-for="(day, index) in days" :key="index + 'alt'" :value="day">{{day}}</option>
					</select>
				</div>
				<div class="alt-calendar-group">
					<label for="months">Month: </label>
					<select name="month" v-model="currentMonth" id="months">
						<option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
					</select>
				</div>
				<div class="alt-calendar-group">
					<label for="years">Year: </label>
					<select name="year" v-model="currentYear" id="years">
						<option v-for="(year, index) in years" :key="index + 'alt'" :value="year">{{year}}</option>
					</select>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { computed, onUnmounted, ref } from 'vue';
import { MONTHS } from './const';

export default {
	setup() {
		const divElement = ref();
		const showPopup = ref(false);
		const date = ref('');
		const today = ref(new Date().getUTCDate());
		const currentMonth = ref(new Date().getUTCMonth());
		const currentYear = ref(new Date().getUTCFullYear());
		const days = computed(() => getDayperMonthsandYear(currentYear.value, currentMonth.value));
		const months = ref(MONTHS);
		const years = computed(() => generateSelectableYears(currentYear.value));

		function getDayperMonthsandYear(year, month) {
			const days = new Date(year, Number(month) + 1, 0).getDate();
			return [...Array(days).keys()].map((day) => day + 1);
		}

		function generateSelectableYears(year) {
			const countYears = 10;
			const initYear = year - 3;
			return [...Array(countYears).keys()].map((index) => index + initYear);
		}

		function handleFocus() {
			showPopup.value = true;
		}

		function elementIsContain(element) {
			// console.log(divElement.value?.contains(element.target));
			showPopup.value = divElement.value?.contains(element.target);
		}

		window.addEventListener('click', elementIsContain);

		onUnmounted(() => window.removeEventListener('click', elementIsContain));

		return {
			currentMonth,
			months,
			today,
			days,
			years,
			currentYear,
			date,
			handleFocus,
			showPopup,
			divElement
		}
	}
}
</script>

<style lang="scss" scoped>
.alt-date {
	position: relative;
	display: inline-flex;
  flex-direction: column;
}
.alt-popup {
	display: inline-block;
	padding: 1rem;
	background: white;
	border-radius: 3px;
	margin-top: 15px;
	position: absolute;
	top: 37px;
	z-index: 2;
}

.alt-calendar {
	display: flex;
	gap: 10px;
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
</style>