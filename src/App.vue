<template>
  <div class="main-container">
    <div class="main-container__header">
      <div class="main-container__title">
        {{ 'Добавить товар' }}
      </div>

      <DropdownList v-model="currentSort" :list="sortList"/>
    </div>


    <div class="main-container__content">
      <ProductCard @add-product="addProductHandler"/>

      <ProductList :productList="filtredList" @remove-product="removeProductHandler"/>
    </div>

  </div>
</template>

<script setup>
  import ProductList from './components/ProductList/index.vue';
  import ProductCard from './components/ProductCard/index.vue';
  import DropdownList from './components/Common/DropdownList.vue';

  import { ref, watch, computed, reactive } from 'vue';

  import { getProductList } from './helpers/mocks.js';
  import constants from './helpers/constants.js';

  function addProductHandler(product) {
    list.value.push(product);
  }

  function removeProductHandler({ id }) {
    const index = list.value.findIndex((item) => item.id === id);
    list.value.splice(index, 1);
  }

  let list = ref([]);

  const currentSort = ref('not-selected');
  const sortList = computed(() => {
    return [
      {
        field: 'not-selected',
        name: 'Не выбрано',
        value: 'not-selected',
        order: null,
        hidden: currentSort.value !== 'not-selected',
      },
      {
        field: 'price',
        name: 'По цене min',
        value: 'price-min',
        order: 'asc',
        hidden: false,
      },
      {
        field: 'price',
        name: 'По цене max',
        value: 'price-max',
        order: 'desc',
        hidden: false,
      },
      {
        field: 'name',
        name: 'По наименованию товара',
        value: 'name',
        order: 'asc',
        hidden: false,
      }
    ];
  });

  const compareMap = {
    name: (order) => (a, b) => order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name) ,
    price: (order) => (a, b) => order === 'asc'
      ? a.price - b.price
      : b.price - a.price
  };
  const filtredList = computed(() => {
    const { field, order } = sortList.value.find(({ value }) => value === currentSort.value);
    return compareMap[field] ? list.value.sort(compareMap[field](order)) : list.value;
  });

  const { LS_PRODUCTS_KEY } = constants;
  let productListFromLS = null;
  try {
    productListFromLS = JSON.parse(localStorage.getItem(LS_PRODUCTS_KEY));
  } catch (err) {
  }

  if (!productListFromLS) {
    getProductList().then((data) => {
      list.value = data;
    });
  } else {
    list.value = productListFromLS;
  }

  watch(list, (newList) => {
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(newList))
  }, { deep: true });

  watch(currentSort, (val) => {
    console.log(val);
  })

</script>

<style>

  body {
    margin: unset;
  }

  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    background-color: #E5E5E5;
    row-gap: 16px;
    padding: 32px;
  }

  .main-container__header {
    display: flex;
    justify-content: space-between;
  }

  .main-container__title {
    display: flex;

    font-size: 28px;
    font-weight: 600;
    line-height: 35px;
  }

  .main-container__content {
    display: flex;
    column-gap: 16px;
  }

</style>
