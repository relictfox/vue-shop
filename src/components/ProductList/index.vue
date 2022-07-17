<template>
  <div class="product-list">
    <ListItem
    v-for="(item, i) in props.productList"
    :key="i"
    :item="item"
    @remove-product="emit('remove-product', $event)"/>
  </div>
</template>

<script setup>
  import ListItem from './ProductListItem.vue';

  const props = defineProps({
    productList: {
      type: Array,
      required: true,
    }
  });

  const emit = defineEmits(['remove-product']);
</script>

<style lang="scss" scoped>
  .product-list {
    display: flex;
    flex-flow: row wrap;
    gap: 16px;
  }
</style>