<template>
  <div class="h-[103px]">
    <HeaderWrapper />
  </div>
  <div class="flex h-[calc(100vh-103px)]">
    <!-- Sidebar -->
    <div class="w-1/4 bg-gray-50 border-r border-gray-200 flex flex-col">
      <FeedbackList />
    </div>

    <div class="flex-1 overflow-auto">
      <FeedbackDetail />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderWrapper from './components/HeaderWrapper.vue';
import FeedbackDetail from './components/FeedbackDetail.vue';
import FeedbackList from './components/FeedbackList.vue';
</script>
