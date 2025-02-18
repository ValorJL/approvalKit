<template>
  <button class="approval-button" :class="buttonClass" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'approve', // 默认是“通过”按钮
    validator: (value) => ['approve', 'reject', 'pending'].includes(value),
  },
  label: String, // 允许用户自定义文本
})

const buttonClass = computed(() => ({
  'approve-button': props.type === 'approve',
  'reject-button': props.type === 'reject',
  'pending-button': props.type === 'pending',
}))

const defaultLabels = {
  approve: '通过',
  reject: '拒绝',
  pending: '待定',
}

// 如果用户没有提供 label，就使用默认文本
const label = computed(() => props.label || defaultLabels[props.type])
</script>

<style scoped>
.approve-button {
  background-color: #95de64;
  color: #135200;
  border: 2px solid;
  border-color: #389e0d;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.approve-button:hover {
  background-color: #73d13d;
}
.approve-button:active {
  background-color: #52c41a;
}

.reject-button {
  background-color: #ffa39e;
  color: #820014;
  border: 2px solid;
  border-color: #cf1322;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.reject-button:hover {
  background-color: #ff7875;
}
.reject-button:active {
  background-color: #ff4d4f;
}

.pending-button {
  background-color: #f0f0f0;
  color: #262626;
  border: 2px solid;
  border-color: #8c8c8c;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.pending-button:hover {
  background-color: #d9d9d9;
}
.pending-button:active {
  background-color: #bfbfbf;
}
</style>
