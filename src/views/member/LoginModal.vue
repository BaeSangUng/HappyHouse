<template>
  <div>
    <modal-container />
  </div>
</template>

<script>
import LoginForm from './LoginForm';

export default {
  mounted() {
    this.popup();
  },
  methods: {
    popup() {
      this.$modal.show(
        LoginForm,
        {
          hot_table: 'data',
          modal: this.$modal,
        },
        {
          name: 'dynamic-modal',
          width: '500px',
          height: '500px',
          draggalbe: true,
        }
      );
    },
  },
};
</script>

<style></style>
