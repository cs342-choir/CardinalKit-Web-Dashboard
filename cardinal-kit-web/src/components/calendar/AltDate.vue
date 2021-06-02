<template>
  <div class="alt-date">
    <date-picker :calendar="calendar" ref="startElement" :showPopup="startDateTooltip" @changeDate="handleChangeDates($event, 'startDate')" v-model="startDate"  label='Start Date' />
    <date-picker :calendar="calendar" v-if="range" ref="endElement" :showPopup="endDateTooltip" @changeDate="handleChangeDates($event, 'endDate')" v-model="endDate" label='End Date' />
  </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';
import DatePicker from './DatePicker.vue';

export default {
  components: { DatePicker },
  props: {
    modelValue: [Date, Object],
    range: {
      type: Boolean,
      default: false
    },
    calendar: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
	setup(props, ctx) {
		const startElement = ref();
		const endElement = ref();
		const startDateTooltip = ref(false);
		const endDateTooltip = ref(false);
    const date = ref();
    const endDate = ref();
    const startDate = ref();

    function handleChangeDates(value, key) {
      if (value) {
        date.value = !props.range ? value : rangeDates(value, key)
        ctx.emit('update:modelValue', date.value)
      }
    }

    const rangeDates = (value,  key) => {
      if(key === 'startDate' && (date.value?.endDate < value)) {
        endDate.value = value;
        return { startDate: value, endDate: value }
      }
      if(key === 'endDate' && (date.value?.startDate > value)) {
        startDate.value = value;
        return { startDate: value, endDate: value };
      }
      return { ...date.value, [key]: value }
    }
    
		function elementIsContain(element) {
			startDateTooltip.value = startElement.value.$el?.contains(element.target);
			props?.range && (endDateTooltip.value = endElement.value.$el?.contains(element.target));
		}

		window.addEventListener('click', elementIsContain);

		onUnmounted(() => window.removeEventListener('click', elementIsContain));

		return {
			startDateTooltip,
      endDateTooltip,
			startElement,
      endElement,
      handleChangeDates,
      endDate,
      startDate
		}
	}
}
</script>

<style lang="scss" scoped>
.alt-date {
	position: relative;
	display: inline-flex;
  gap: 10px;
}
</style>