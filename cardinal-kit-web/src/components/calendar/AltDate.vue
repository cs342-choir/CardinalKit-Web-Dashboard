<template>
  <div class="alt-date">
		<label class="alt-datetime-wrapper">
			<input type="datetime" name="date" />
		</label>
		<div class="alt-popup">
			<div class="flex alt-calendar">
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
import { computed, ref } from 'vue';
import { MONTHS } from './const';

export default {
	setup() {
		const today = ref(new Date().getUTCDate());
		const currentMonth = ref(new Date().getUTCMonth());
		const currentYear = ref(new Date().getUTCFullYear());
		const days = computed(() => getDayperMonthsandYear(2021, currentMonth.value));
		const months = ref(MONTHS);
		const years = computed(() => generateSelectableYears(currentYear.value));

		function getDayperMonthsandYear(year, month) {
			const days = new Date(year, month + 1, 0).getDate();
			return [...Array(days).keys()].map((day) => day + 1);
		}

		function generateSelectableYears(year) {
			const countYears = 10;
			const initYear = year - 3;
			return [...Array(countYears).keys()].map((index) => index + initYear);
		}

		return {
			currentMonth,
			months,
			today,
			days,
			years,
			currentYear
		}
	}
}
</script>

<style lang="scss" scoped>

</style>