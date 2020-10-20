<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      :loading-text="loadingText"
      :headers="headersWithActions"
      :items="tableData"
      item-key="_id"
      :search="search"
      :show-select="selectable"
      dense
      @input="itemSelected"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon color="primary" class="mr-2" @click="viewItem(item)">
          mdi-magnify
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["headers", "tableData", "title", "loading", "viewItem", "selectable"],
  data() {
    return {
      loadingText: "Loading... Please wait.",
      search: ""
    };
  },
  computed: {
    headersWithActions() {
      return [
        ...this.headers,
        { text: "Actions", value: "actions", sortable: false }
      ];
    }
  },
  methods: {
    itemSelected(items) {
      this.$emit("itemSelected", items);
    }
  }
};
</script>