<script lang="ts" setup>
import {ref, defineProps, defineEmits, watch, onBeforeUnmount, onMounted, toRefs} from 'vue'

const emit = defineEmits<{
    (event: 'update:startMonth', month: string): void
    (event: 'update:endMonth', month: string | undefined): void
}>()

const props = defineProps({
    placeholder: { type: String, default: '' },
    startMonth: { type: String, default: '' },
    endMonth: { type: String, default: '' },
    monthFormat: { 
      type: Array, 
      default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
})

let isClickingButton = ref(false)
let isPanelOpen = ref(false)
let isHovering = ref(false)
let hoverMonth = ref<string | null>(null);
let displayText = ref('')

let months = ref([
    { id: '01', name: '01' },
    { id: '02', name: '02' },
    { id: '03', name: '03' },
    { id: '04', name: '04' },
    { id: '05', name: '05' },
    { id: '06', name: '06' },
    { id: '07', name: '07' },
    { id: '08', name: '08' },
    { id: '09', name: '09' },
    { id: '10', name: '10' },
    { id: '11', name: '11' },
    { id: '12', name: '12' }
])

const getMonthName = (id:string) => {
    const month = months.value.find(m => m.id === id);
    return month ? month.name : '';
}

// let displayText = computed(() => {
//     if (props.startMonth && props.endMonth) {
//         return ${getMonthName(props.startMonth)} - ${getMonthName(props.endMonth)};
//     } else if (props.startMonth) {
//         return getMonthName(props.startMonth);
//     } else {
//         return props.placeholder;
//     }
// });

const updateDisplayText = () => {
    const startMonthObj = months.value.find(month => month.id === props.startMonth);
    const endMonthObj = months.value.find(month => month.id === props.endMonth);
    if (startMonthObj && endMonthObj) {
        displayText.value = `${startMonthObj.name} - ${endMonthObj.name}`;
    } else if (startMonthObj) {
        displayText.value = startMonthObj.name;
    } else {
        displayText.value = props.placeholder;
    }
};


const openPanel = () => {
    isClickingButton.value = true;
    isPanelOpen.value = true;
    setTimeout(() => (isClickingButton.value = false), 200);
    document.addEventListener('click', handleGlobalClick);
}

const handleGlobalClick = () => {
    setTimeout(() => {
        if (!isClickingButton.value) {
          isPanelOpen.value = false;
        }
      }, 200);
}

const isInRange = (month: string) => props.startMonth && props.endMonth && month > props.startMonth && month < props.endMonth;
const isInHoverRange = (month: string) => props.startMonth && !props.endMonth && month > props.startMonth && month <= hoverMonth.value!

const selectMonth = (month: {id: string, name: string}) => {
    isClickingButton.value = true;
    setTimeout(() => (isClickingButton.value = false), 200);
    if (!props.startMonth || (props.startMonth && props.endMonth)) {
        emit('update:startMonth', month.id);
        emit('update:endMonth', undefined);
    } else if (!props.endMonth) {
      if (month.id >= props.startMonth) {
        emit('update:endMonth', month.id);
      } else {
        emit('update:startMonth', month.id);
        emit('update:endMonth', props.startMonth);
      }
      closePanel();
    }
}

const closePanel = () => {
    isPanelOpen.value = false
    removeGlobalClickListener()
}

const removeGlobalClickListener = () => {
    document.removeEventListener('click', handleGlobalClick)
}

const handleHover = (month: string) => {
    isHovering.value = true;
    hoverMonth.value = month;
}

const clearHover = () => {
    isHovering.value = false;
    hoverMonth.value = null;
}

watch(() => props.monthFormat, () => {
    months.value = months.value.map((m, index) => ({
        ...m,
        name: String(props.monthFormat[index] || m.name) // 確保 name 為 string
    }));
}, { immediate: true });

const { startMonth, endMonth } = toRefs(props); 
watch([startMonth, endMonth], ([newStart, newEnd], [oldStart, oldEnd]) => updateDisplayText());
onMounted (() => updateDisplayText())
onBeforeUnmount(() => {
    document.removeEventListener('click', handleGlobalClick);
});

</script>

<template>
    <div class='month-range-picker' @click.stop>
        <!-- <h4>選擇月份範圍</h4> -->

        <!-- 單一輸入框 -->
        <div class='input-field'>
            <!-- <button @focus='openPanel'>開啟</button> -->
            <input type='button' v-model='displayText' :placeholder='placeholder' @click='openPanel' @blur='handleGlobalClick' />
        </div>

        <!-- 月份選擇面板 -->
        <div  class='months-panel' v-if='isPanelOpen'>
            <div v-for='month in months' :key='month.id' :class='[ "month", {
                    "start-month": month.id === props.startMonth,
                    "end-month": month.id === props.endMonth,
                    "in-range": isInRange(month.id),
                    "hover-range": isHovering && isInHoverRange(month.id),
                },
            ]' @click='selectMonth(month)' @mouseover='handleHover(month.id)' @mouseleave='clearHover'>
                {{ month.name }}
            </div>
        </div>
    </div>
</template>


<style lang='scss' scoped>
.month-range-picker {
    // padding: 20px;
    position: relative;

    .input-field input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        background: white;
        text-align: left;
    }
}

.months-panel {
    max-width: 250px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    border: 1px solid #ddd;
    padding: 12px;
    border-radius: 5px;
    position: absolute;
    background: white;
    z-index: 10;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    color: black;
}

.month {
    width: calc(100% / 3 - 20px);
    text-align: center;
    padding: 4px 10px;
    margin: 0;
    cursor: pointer;
    border: 0;
    // border-radius: 5px;

    &.start-month {
        background-color: #007bff;
        color: white;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    &.end-month {
        background-color: #007bff;
        color: white;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    &.in-range,&.hover-range {
        background-color: #e0efff;
    }

    &:hover{
        background-color: #007bff;
        color: white;
        border-radius: 4px;
    }
}
</style>
