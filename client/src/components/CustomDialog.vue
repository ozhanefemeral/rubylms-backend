<template>
  <v-dialog v-model="show"> </v-dialog>
</template>

<script>
export default {
  props: ["value"],

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style>
</style>