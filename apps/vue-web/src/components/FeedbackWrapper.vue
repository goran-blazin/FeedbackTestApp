<template>
  <div class="w-1/4 bg-white border-r border-gray-200 flex flex-col justify-between">
    <FeedbackList />
  </div>
  <div class="flex-1 h-full overflow-y-auto">
    <FeedbackView />
  </div>
</template>
<script setup lang="ts">
import FeedbackList from './FeedbackList.vue';
import FeedbackView from './FeedbackView.vue';
</script>