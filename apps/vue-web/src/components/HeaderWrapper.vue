<template>
  <div
    class="flex items-center justify-between bg-gray-50 p-4 border-b border-gray-200"
  >
    <div class="flex items-center space-x-2">
      <img src="../assets/checkIcon.svg" alt="checkIcon" />
    </div>
    <div class="flex-1 mx-4"></div>
    <GreenButton>New Feedback</GreenButton>
  </div>
</template>

<script setup lang="ts">
import GreenButton from './UI/GreenButton.vue';
</script>
