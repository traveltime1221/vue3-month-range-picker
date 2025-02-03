# vue3-month-range-picker

這是一個非常簡易而且只有選擇月份範圍的 Vue3 組件，支持更換月份格式。

![範例](https://github.com/traveltime1221/vue3-month-range-picker/raw/main/src/assets/image/example.gif)

## 安裝

### 安裝方式
```
npm install vue3-month-range-picker
```

### 其他版本
如果需要 vue2 版本可以前往此處：[vue2-month-range-picker](https://www.npmjs.com/package/vue2-month-range-picker)

## 使用方式
```
<script lang="ts" setup>
import MonthRangePicker from '../components/MonthRangePicker.vue';
import {ref} from 'vue'

let monthFormat = ref(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'])
let startMonth = ref<string | undefined>('10');
let endMonth = ref<string | undefined>('12');

</script>

<template>
    <MonthRangePicker
        :monthFormat="monthFormat"
        :startMonth="startMonth"
        :endMonth="endMonth"
        placeholder="請選擇月份範圍"
        @update:startMonth="startMonth = $event"
        @update:endMonth="endMonth = $event"
    />
</template>

```

## 屬性
|  參數 | 類型 | 描述 | 
| -------- | -------- | -------- | 
| monthFormat    | Array     | 使用者預設月份格式, 若無攜帶系統則預設英文格式：['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']    | 
| startMonth    | String     | 預設、傳遞選擇起始月份    |
| endMonth    | String     | 預設、傳遞選擇結束月份    | 
| placeholder    | String     | 提示, 無攜帶系統預設為空值    | 


## 版本歷程
* 1.0.1 文件修正
* 1.0.0 第一次發布

## License
MIT
