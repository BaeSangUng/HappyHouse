<template>
  <div>
    <ul v-for="item in items" v-bind:key="item.no">
      <li>{{ item.img }}</li>
      <li>{{ item.title }}</li>
      <li>{{ item.price }}</li>
      <li>{{ item.jjim }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          no: 1,
          img: 'img',
          title: 'title',
          price: 1000,
          jjim: 10,
        },
      ],
    };
  },
};
</script>

<style></style>
