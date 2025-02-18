<script setup lang="ts">
import ApprovalButton from './components/ApprovalButton.vue'
import ApprovalSteps from './components/ApprovalSteps.vue'
</script>

<template>
  <ApprovalButton type="approve" />
  <ApprovalButton type="onhold" />
  <ApprovalButton type="reject" />
  <br /><br />
  <ApprovalSteps status="not-started" />
  <ApprovalSteps status="in-progress" />
  <ApprovalSteps status="completed" />
  <ApprovalSteps status="rejected" />
</template>

<style scoped></style>
