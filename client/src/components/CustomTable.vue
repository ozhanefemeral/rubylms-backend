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
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon color="accent" class="mr-2" @click="viewItem(item)">
          mdi-magnify
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["headers", "tableData", "title", "loading", "viewItem"],
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
  }
};
</script>