<template>
  <button class="approval-button" :class="buttonClass" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { ApprovalButtonType, ButtonSize } from '@/types'

const props = defineProps<{
  type?: ApprovalButtonType
  label?: string
  size?: ButtonSize
}>()

// 通过 computed 计算 buttonClass，根据 type 生成不同的 CSS 类，动态改变按钮样式。
const buttonClass = computed(() => ({
  [`${props.type}-button`]: props.type,
  [`button-${props.size}`]: props.size,
}))

const defaultLabels: Record<ApprovalButtonType, string> = {
  approve: '通过',
  reject: '拒绝',
  onhold: '待定',
}

// 可以通过 label 传入自定义文本，如果用户没有提供 label，就使用默认文本
const label = computed(() => props.label || defaultLabels[props.type || 'approve'])
</script>

<style scoped>
.approve-button {
  background-color: #95de64;
  color: #135200;
  border: 2px solid;
  border-color: #389e0d;
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
  border-radius: 4px;
  cursor: pointer;
}
.reject-button:hover {
  background-color: #ff7875;
}
.reject-button:active {
  background-color: #ff4d4f;
}

.onhold-button {
  background-color: #f0f0f0;
  color: #262626;
  border: 2px solid;
  border-color: #8c8c8c;
  border-radius: 4px;
  cursor: pointer;
}
.onhold-button:hover {
  background-color: #d9d9d9;
}
.onhold-button:active {
  background-color: #bfbfbf;
}

.button-small {
  padding: 4px 8px;
  font-size: 12px;
}
.button-medium {
  padding: 8px 16px;
  font-size: 14px;
}
.button-large {
  padding: 12px 24px;
  font-size: 16px;
}
</style>
