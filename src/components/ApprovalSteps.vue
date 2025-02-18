<template>
  <div class="approval-steps">
    <div v-for="(step, index) in steps" :key="step.id" class="step-container">
      <!--节点之间的连线-->
      <div v-if="index > 0" class="step-line" :class="getStepLineClass(index)"></div>
      <div class="step">
        <!--三个表示状态的节点-->
        <div class="step-node" :class="getStepClass(index)">
          <!--节点中间的白圆点-->
          <svg viewBox="0 0 24 24" class="inner-circle">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
        <div class="step-label">{{ step.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { ApprovalStatus, ApprovalStep } from '@/types'

const props = defineProps<{
  status: ApprovalStatus
}>()

const steps = computed<ApprovalStep[]>(() => [
  { id: 1, label: '未处理', status: 'not-started' },
  { id: 2, label: '处理中', status: 'in-progress' },
  { id: 3, label: getFinalStatusLabel(), status: props.status },
])

/* 设置默认文本值 */
function getFinalStatusLabel(): string {
  switch (props.status) {
    case 'completed':
      return '已通过'
    case 'rejected':
      return '已驳回'
    default:
      return '待定'
  }
}

/* 设置节点颜色 */
function getStepClass(index: number): string {
  if (index === 0) return 'green'
  if (index === 1) return props.status === 'not-started' ? 'gray' : 'green'
  if (index === 2) {
    if (props.status === 'completed') return 'green'
    if (props.status === 'rejected') return 'red'
    return 'gray'
  }
  return 'gray'
}

/* 设置进度条颜色 */
function getStepLineClass(index: number): string {
  if (index === 1) return props.status === 'not-started' ? 'gray' : 'green'
  if (index === 2) {
    if (props.status === 'completed' || props.status === 'rejected') return 'green'
    return 'gray'
  }
  return 'gray'
}
</script>

<style scoped>
.approval-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: relative;
}

.step-container {
  display: flex;
  align-items: center;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* 进度条圆圈 */
.step-node {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  position: relative;
}

.step-node.green {
  background-color: #52c41a;
}

.step-node.gray {
  background-color: #8c8c8c;
}

.step-node.red {
  background-color: #ff4d4f;
}

.step-label {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  text-align: center;
  color: gray;
}

/* 进度条连线 */
.step-line {
  width: 100px;
  height: 5px;
  background: #ddd;
  margin-left: -10px;
  margin-right: -10px;
  transform: translateY(-10px);
}

.step-line.green {
  background: #52c41a;
}

.step-line.gray {
  background: #8c8c8c;
}

/* 圆心 */
.inner-circle {
  width: 16px;
  height: 16px;
  fill: white;
}
</style>
