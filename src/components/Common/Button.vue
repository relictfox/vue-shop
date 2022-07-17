<template>
  <button
  class="button"
  :class="{ 'button--disabled': disabled }"
  :disabled="disabled"
  @click="emit('click', $event)">
    {{ props.text }}
  </button>
</template>

<script setup>
  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits({
    click: (val) => val
  });
</script>

<style lang="scss" scoped>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    cursor: pointer;
    max-height: 36px;

    font-size: 12px;
    font-weight: 600;

    line-height: 15px;
    border-radius: 10px;
    border: none;

    &:hover {
      opacity: .8;
    }
  }

  .button.button--disabled {
    background-color: #EEEEEE;
    cursor: default;

    &:hover {
      opacity: unset;
    }
  }
</style>