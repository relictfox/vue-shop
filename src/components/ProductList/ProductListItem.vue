<template>
  <div v-if="item" class="product-list-item">
    <div class="product-list-item__image-container">
      <img class="product-list-item__image" :src="props.item.image">

      <div v-html="removeIcon" class="product-list-item__remove-icon" @click="emit('remove-product', item)"/>
    </div>

    <div class="product-list-item__content">
      <div class="product-list-item__title title">
        {{ props.item.name }}
      </div>
      
      <div class="product-list-item__desc description">
        {{ props.item.description }}
      </div>

      <div class="product-list-item__price title">
        {{ `${props.item.price} руб.` }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import removeIcon from '../../assets/remove-icon.svg?raw';

  const props = defineProps({
    item: {
      type: Object,
      default: null,
    }
  });

  const emit = defineEmits(['remove-product']);

</script>

<style lang="scss" scoped>
  @use '../../styles/mixins.scss' as *;

  .product-list-item {
    display: flex;
    flex-direction: column;

    width: 332px;
    height: 423px;
    background-color: white;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);

    border-radius: 2px;

    position: relative;

    &:hover .product-list-item__remove-icon {
      display: block;
    }

    @include between-children {
      margin-bottom: 16px;
    }
  }

  .product-list-item__image-container {
    width: 100%;
    height: 200px;
    // background-image: url('assets/Rectangle.png');
    position: relative;

    img {
      @include size(100%);
    }
  }

  .product-list-item__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding: 0 16px 25px 16px;

    overflow: auto;
  }

  .product-list-item__title {
    margin-bottom: 16px;
  }

  .product-list-item__title, .product-list-item__price  {
    display: flex;
  }
  
  .product-list-item__price {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
  }

  .product-list-item__desc  {
    display: flex;
    text-align: left;
    margin-bottom: 32px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; // TODO: решить проблему для старых браузеров
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .product-list-item__remove-icon {
    position: absolute;
    left: 90%;
    top: 5%;
    display: none;

    cursor: pointer;
  }
</style>