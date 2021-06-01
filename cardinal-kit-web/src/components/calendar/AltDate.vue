<template>
  <div ref="divElement" class="alt-date">
		<label class="alt-datetime-wrapper">
			<input autocomplete="off" class="alt-datetime-wrapper__input" placeholder="--/--/--" type="text" name="datetime" v-model="date"/>
		</label>
		<div v-if="showPopup" class="alt-popup">
			<div class="alt-calendar">
				<div class="alt-calendar-group">
					<label class="alt-calendar-group__label" for="days">Day: </label>
					<select @change="handleChangeDate" name="days" v-model="today" id="days">
						<option v-for="(day, index) in days" :key="index + 'alt'" :value="day">{{day}}</option>
					</select>
				</div>
				<div class="alt-calendar-group">
					<label class="alt-calendar-group__label" for="months">Month: </label>
					<select @change="handleChangeDate" name="month" v-model="currentMonth" id="months">
						<option v-for="month in months" :key="month.id" :value="month.id">{{month.name}}</option>
					</select>
				</div>
				<div class="alt-calendar-group">
					<label class="alt-calendar-group__label" for="years">Year: </label>
					<select @change="handleChangeDate" name="year" v-model="currentYear" id="years">
						<option v-for="(year, index) in years" :key="index + 'alt'" :value="year">{{year}}</option>
					</select>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { MONTHS } from './const';

export default {
  props: {
    modelValue: Date,
  },
  emits: ['update:modelValue'],
	setup(props, ctx) {
		const divElement = ref();
		const showPopup = ref(false);
		const date = computed(()  => `${today.value}/${Number(currentMonth.value) + 1}/${currentYear.value}`);
		const today = ref(new Date().getUTCDate());
		const currentMonth = ref(new Date().getUTCMonth());
		const currentYear = ref(new Date().getUTCFullYear());
		const days = computed(() => getDayperMonthsandYear(currentYear.value, currentMonth.value));
		const months = ref(MONTHS);
		const years = computed(() => generateSelectableYears(currentYear.value));

    onMounted(() => ctx.emit('update:modelValue', new Date(currentYear.value, currentMonth.value, today.value)));

		function getDayperMonthsandYear(year, month) {
			const days = new Date(year, Number(month) + 1, 0).getDate();
			return [...Array(days).keys()].map((day) => day + 1);
		}

		function generateSelectableYears(year) {
			const countYears = 10;
			const initYear = year - 3;
			return [...Array(countYears).keys()].map((index) => index + initYear);
		}

    function handleChangeDate() {
      const startDate = new Date(currentYear.value, currentMonth.value, today.value);
      ctx.emit('update:modelValue', startDate)
    }

		function elementIsContain(element) {
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
			showPopup,
			divElement,
      handleChangeDate
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

.alt-calendar {
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
</style>