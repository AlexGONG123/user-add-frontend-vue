<template>
  <!-- <button class="btn">add user</button> -->
  <router-view></router-view>
</template>

<script lang="ts" setup>

</script>

<style>
.btn{
  @apply bg-purple-500 text-indigo-50 px-4 py-2 rounded-full transition-all duration-500 hover:( bg-purple-900) focus:(ring-2 ring-purple-900);
  position: absolute; /* 绝对定位 */
  top: 10px; /* 顶部间距 */
  left: 10px;
}
</style>