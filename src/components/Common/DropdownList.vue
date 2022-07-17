<template>
  <select class="dropdown-list" @change="emit('update:modelValue', $event.target.value)">
    <option
    v-for="({ value, name, hidden }, i) in list"
    :key="i"
    :value="value"
    :hidden="hidden"
    class="dropdown-list__item">
      {{ name }}
    </option>
  </select>
</template>

<script setup>

  defineProps({
    list: {
      type: Array,
      default: [],
    },
    modelValue: String,
  });

  const emit = defineEmits(['update:modelValue']);

</script>

<style lang="scss" scoped>

  .dropdown-list {
    display: flex;

    border: 1px solid rgba(0, 0, 0, .75);
    
    position: relative;
  }

</style>