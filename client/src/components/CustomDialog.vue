<template>
  <div>
    <v-dialog v-model="show" @input="$emit('input')" max-width="600">
      <v-card>
        <slot name="content"></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["value", "title"],
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