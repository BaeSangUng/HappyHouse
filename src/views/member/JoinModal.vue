<template>
  <div>
    <modal-container />
  </div>
</template>

<script>
import JoinForm from './JoinForm';

export default {
  mounted() {
    this.popup();
  },
  methods: {
    popup() {
      this.$modal.show(
        JoinForm,
        {
          hot_table: 'data',
          modal: this.$modal,
        },
        {
          name: 'dynamic-modal',
          width: '500px',
          height: '600px',
          draggalbe: true,
        }
      );
    },
  },
};
</script>

<style></style>
