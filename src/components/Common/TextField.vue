<template>
  <div class="text-field">
    <div v-if="props.title" class="text-field__header">
      <span class="text-field__title">
        {{ props.title }}
      </span>

      <div v-if="props.required" class="text-field__point"/>
    </div>

    <template v-if="!props.multiline">
      <input
      class="text-field__input"
      :class="{ 'text-field__input--error': error }"
      v-model="currentValue"
      :type="props.type"
      :placeholder="props.placeholder"/>
    </template>

    <template v-else>
      <textarea
      class="text-field__input"
      v-model="currentValue"
      :class="{ 'text-field__input--error': error }"
      :type="props.type"
      :placeholder="props.placeholder"
      cols="40"
      rows="6"/>
    </template>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits([
    'input'
  ]);

  const currentValue = ref(props.value);

  watch(currentValue, (val) => {
    emit('input', val);
  });

  watch(() => props.value, (val) => {
    currentValue.value = val;
  });
</script>

<style lang="scss" scoped>
  @use '../../styles/mixins.scss' as *;

  .text-field {
    display: flex;
    flex-direction: column; 

    @include between-children {
      margin-bottom: 4px;
    }
  }

  .text-field__header {
    display: flex;

    @include between-children {
      margin-right: 4px;
    }
  }

  .text-field__title {
    font-size: 10px;
    font-weight: 400;
    text-align: left;
  }

  .text-field__point {
    background-color: #FF8484;
    border-radius: 4px;

    @include size(4px);
  }

  .text-field__input {
    box-shadow: 0px 2px 5px 0px #0000001A;
    border-radius: 4px;
    padding: 10px 15px;

    resize: none;
    outline: none;
    border: none;
    box-sizing: border-box;
    font-family: unset;

    &::placeholder {
      font-size: 12px;
    }

    width: 100%;

    border-width: 1px;
    border-style: solid;
    border-color: transparent ;
  }

  .text-field__input--error {
    border-color: red;
  }
</style>