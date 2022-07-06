<template>
  <div class="app-content content">
    <div class="content-wrapper">
      <div class="content-body">
        <transition name="fade" mode="out-in">
          <nuxt />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "full",
};
</script>
