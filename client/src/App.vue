<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item
          link
          v-for="(item, index) in navLinks"
          :key="index"
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="pa-2">
        <v-switch
          v-model="darkMode"
          prependIcon="mdi-theme-light-dark"
          color="white"
          label="Dark Mode"
        >
        </v-switch>
      </div>

      <div class="pa-2">
        <v-btn block color="red" tile dark>Logout</v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid align-start>
        <v-row align="start" justify="start">
          <v-col cols="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    navLinks: [
      {
        to: "/",
        icon: "mdi-home",
        title: "Home"
      },
      {
        to: "/courses",
        icon: "mdi-book",
        title: "Courses"
      },
      {
        to: "/teachers",
        icon: "mdi-account",
        title: "Teachers"
      },
      {
        to: "/students",
        icon: "mdi-school",
        title: "Students"
      },
      {
        to: "/",
        icon: "mdi-home",
        title: "Home"
      }
    ]
  }),
  computed: {
    darkMode: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        this.$vuetify.theme.dark = val;
        return val;
      }
    }
  }
};
</script>

<style>
</style>