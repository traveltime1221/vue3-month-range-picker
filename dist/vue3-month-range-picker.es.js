!function(){"use strict";try{if("undefined"!=typeof document){var d=document.createElement("style");d.appendChild(document.createTextNode(".month-range-picker[data-v-71d16e4a]{position:relative}.month-range-picker .input-field input[data-v-71d16e4a]{padding:8px;border:1px solid #ddd;border-radius:5px;cursor:pointer;width:100%;background:#fff;text-align:left}.months-panel[data-v-71d16e4a]{max-width:250px;display:flex;flex-wrap:wrap;margin-top:5px;border:1px solid #ddd;padding:12px;border-radius:5px;position:absolute;background:#fff;z-index:10;box-shadow:0 2px 5px #0003;color:#000}.month[data-v-71d16e4a]{width:calc(33.3333333333% - 20px);text-align:center;padding:4px 10px;margin:0;cursor:pointer;border:0}.month.start-month[data-v-71d16e4a]{background-color:#007bff;color:#fff;border-top-left-radius:4px;border-bottom-left-radius:4px}.month.end-month[data-v-71d16e4a]{background-color:#007bff;color:#fff;border-top-right-radius:4px;border-bottom-right-radius:4px}.month.in-range[data-v-71d16e4a],.month.hover-range[data-v-71d16e4a]{background-color:#e0efff}.month[data-v-71d16e4a]:hover{background-color:#007bff;color:#fff;border-radius:4px}")),document.head.appendChild(d)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}}();
import { defineComponent, ref, watch, toRefs, onMounted, onBeforeUnmount, openBlock, createElementBlock, withModifiers, createElementVNode, withDirectives, isRef, vModelText, unref, Fragment, renderList, normalizeClass, toDisplayString } from "vue";
const _hoisted_1 = { class: "input-field" };
const _hoisted_2 = ["placeholder"];
const _hoisted_3 = { class: "months-panel" };
const _hoisted_4 = ["onClick", "onMouseover"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MonthRangePicker",
  props: {
    placeholder: { type: String, default: "" },
    startMonth: { type: String, default: "" },
    endMonth: { type: String, default: "" },
    monthFormat: {
      type: Array,
      default: () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  },
  emits: ["update:startMonth", "update:endMonth"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    let isClickingButton = ref(false);
    let isPanelOpen = ref(false);
    let isHovering = ref(false);
    let hoverMonth = ref(null);
    let displayText = ref("");
    let months = ref([
      { id: "01", name: "01" },
      { id: "02", name: "02" },
      { id: "03", name: "03" },
      { id: "04", name: "04" },
      { id: "05", name: "05" },
      { id: "06", name: "06" },
      { id: "07", name: "07" },
      { id: "08", name: "08" },
      { id: "09", name: "09" },
      { id: "10", name: "10" },
      { id: "11", name: "11" },
      { id: "12", name: "12" }
    ]);
    const updateDisplayText = () => {
      const startMonthObj = months.value.find((month) => month.id === props.startMonth);
      const endMonthObj = months.value.find((month) => month.id === props.endMonth);
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
      setTimeout(() => isClickingButton.value = false, 200);
      document.addEventListener("click", handleGlobalClick);
    };
    const handleGlobalClick = () => {
      setTimeout(() => {
        if (!isClickingButton.value) {
          isPanelOpen.value = false;
        }
      }, 200);
    };
    const isInRange = (month) => props.startMonth && props.endMonth && month > props.startMonth && month < props.endMonth;
    const isInHoverRange = (month) => props.startMonth && !props.endMonth && month > props.startMonth && month <= hoverMonth.value;
    const selectMonth = (month) => {
      isClickingButton.value = true;
      setTimeout(() => isClickingButton.value = false, 200);
      if (!props.startMonth || props.startMonth && props.endMonth) {
        emit("update:startMonth", month.id);
        emit("update:endMonth", void 0);
      } else if (!props.endMonth) {
        if (month.id >= props.startMonth) {
          emit("update:endMonth", month.id);
        } else {
          emit("update:startMonth", month.id);
          emit("update:endMonth", props.startMonth);
        }
        closePanel();
      }
    };
    const closePanel = () => {
      isPanelOpen.value = false;
      removeGlobalClickListener();
    };
    const removeGlobalClickListener = () => {
      document.removeEventListener("click", handleGlobalClick);
    };
    const handleHover = (month) => {
      isHovering.value = true;
      hoverMonth.value = month;
    };
    const clearHover = () => {
      isHovering.value = false;
      hoverMonth.value = null;
    };
    watch(() => props.monthFormat, () => {
      months.value = months.value.map((m, index) => ({
        ...m,
        name: String(props.monthFormat[index] || m.name)
        // 確保 name 為 string
      }));
    }, { immediate: true });
    const { startMonth, endMonth } = toRefs(props);
    watch([startMonth, endMonth], ([newStart, newEnd], [oldStart, oldEnd]) => updateDisplayText());
    onMounted(() => updateDisplayText());
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleGlobalClick);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "month-range-picker",
        onClick: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["stop"]))
      }, [
        createElementVNode("div", _hoisted_1, [
          withDirectives(createElementVNode("input", {
            type: "button",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(displayText) ? displayText.value = $event : displayText = $event),
            placeholder: __props.placeholder,
            onClick: openPanel,
            onBlur: handleGlobalClick
          }, null, 40, _hoisted_2), [
            [vModelText, unref(displayText)]
          ])
        ]),
        createElementVNode("div", _hoisted_3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(months), (month) => {
            return openBlock(), createElementBlock("div", {
              key: month.id,
              class: normalizeClass([
                "month",
                {
                  "start-month": month.id === props.startMonth,
                  "end-month": month.id === props.endMonth,
                  "in-range": isInRange(month.id),
                  "hover-range": unref(isHovering) && isInHoverRange(month.id)
                }
              ]),
              onClick: ($event) => selectMonth(month),
              onMouseover: ($event) => handleHover(month.id),
              onMouseleave: clearHover
            }, toDisplayString(month.name), 43, _hoisted_4);
          }), 128))
        ])
      ]);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const MonthRangePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71d16e4a"]]);
export {
  MonthRangePicker as default
};
