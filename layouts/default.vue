<template>
  <v-app dark>
    <v-app-bar
        :clipped-left="clipped"
        fixed
        app
        class="header"
    >
      <v-btn
          fab
          dark
          small
          color="primary"
          to="/"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"/>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt keep-alive/>
      </v-container>
    </v-main>
    <v-footer
        :absolute="!fixed"
        app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Movies',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/welcome'
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire'
        // }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Movies'
    }
  }
}
</script>

<style lang="scss">
.header__icon {
  text-decoration: none;
}
</style>
