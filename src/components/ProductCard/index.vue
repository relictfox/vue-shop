<template>
  <div class="product-card">
    <div class="product-card__fields">
      <TextField
      v-for="([fieldName, { value, config }], i) in Object.entries(fields)"
      :error="fields[fieldName].error"
      :key="i"
      v-bind="{ ...config, value }"
      @input="inputHandler({ fieldName, value: $event })"
      @keyup.enter="addToListHandler"/>
    </div>

    <ActionButton
    class="product-card__button"
    :class="{ 'product-card__button--disabled': false }"
    :disabled="hasError"
    text="Добавить товар"
    @click="addToListHandler"/>
  </div>
</template>

<script setup>
  import { reactive, computed } from 'vue';

  import TextField from '../Common/TextField.vue';
  import ActionButton from '../Common/Button.vue';

  const emit = defineEmits({
    addProduct: (value) => typeof value === 'object'
  });

  function inputHandler({ fieldName, value }) {
    fields[fieldName].value = value;
    checkErrorHandler(fieldName);
  }

  function checkErrorHandler(fieldName) {
    if (!fields[fieldName].dirty) {
      if (fields[fieldName].value.length) {
        fields[fieldName].dirty = true;
      } else {
        return;
      }
    }

    fields[fieldName].error
      = Object.entries(fields[fieldName].rules).some(([key, v]) => v ? !rulesCheck[key]({ value: fields[fieldName].value, rule: v }) : false);
  }

  function addToListHandler() {
    if (hasError.value) return;

    const fieldsKeyValue = Object.entries(fields);

    emit('addProduct', fieldsKeyValue.reduce((acc, [k, v]) => {
      acc[k] = v.value;
      return acc;
    }, {}));
    fieldsKeyValue.forEach(([k, v]) => {
      fields[k].value = '';
      fields[k].dirty = false;
    });
  }

  const rulesCheck = {
    required: ({ value }) => value !== '',
    number: ({ value }) => Number.isInteger(+value) && Math.sign(+value) !== -1,
    maxLength: ({ value, rule }) => value.length <= rule,
    minLength: ({ value, rule }) => value.length >= rule
  };

  const hasError = computed(() => {
    const fieldsKeyValue = Object.entries(fields);
    return fieldsKeyValue.some(([, field]) => field.error || (Object.keys(field.rules).length > 0 && !field.dirty));
  });

  const fields = reactive({
    name: {
      value: '',
      error: false,
      dirty: false,
      rules: {
        required: true,
      },
      config: {
        title: 'Наименование товара',
        placeholder: 'Введите наименование товара',
        multiline: false,
        required: true,
      }
    },
    description: {
      value: '',
      error: false,
      dirty: false,
      rules: {
        required: false,
      },
      config: {
        title: 'Описание товара',
        placeholder: 'Введите описание товара',
        multiline: true,
        required: false,
      }
    },
    image: {
      value: '',
      error: false,
      dirty: false,
      rules: {
        required: true,
      },
      config: {
        title: 'Ссылка на изображение товар',
        placeholder: 'Введите ссылку',
        multiline: false,
        required: true,
      }
    },
    price: {
      value: '',
      error: false,
      dirty: false,
      rules: {
        required: true,
        number: true,
        maxLength: 12,
        minLength: 1,
      },
      config: {
        title: 'Цена товара',
        placeholder: 'Введите цену',
        multiline: false,
        required: true,
      }
    },
  });

</script>

<style lang="scss" scoped>
  @use '../../styles/mixins.scss' as *;

  .product-card {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    background-color: white;
    width: 332px;
    height: 400px;
    padding: 24px;

    // & > :last-child {
    //   margin-top: 24px;
    // }
  }

  .product-card__fields {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    @include between-children {
      margin-bottom: 16px;
    }
  }

  .product-card__text-field {
    width: 100%;
  }

  .product-card__button {
    background-color: #7BAE73;
  }
  .product-card__button--disabled {
    background-color: #EEEEEE;
  }
</style>