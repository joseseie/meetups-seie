<template>
  <v-app>

      <v-toolbar dark class="primary">

          <v-toolbar-side-icon
                  @click.native.stop="sideNav = true"
                  class="hidden-sm-and-up">
          </v-toolbar-side-icon>
          <v-toolbar-title>
              <router-link to="/" tag="span" style="cursor: pointer;">DevMeetups</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-only">
              <v-btn
                    flat
                    v-for="item in menuItems"
                    :key="item.title"
                    router
                    :to="item.link">
                  <v-icon left>{{ item.icon }} </v-icon>
                  {{ item.title }}
              </v-btn>
          </v-toolbar-items>

      </v-toolbar>

      <!--Blema de drawer nav for mobile, contornado com v-if-->
      <v-navigation-drawer temporary v-model="sideNav" v-if="sideNav">
          <v-list>
              <v-list-tile
                      v-for="item in menuItems"
                      :key="item.title"
                      router
                      :to="item.link">
                  <v-list-tile-action>
                      <v-icon> {{ item.icon }} </v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content> {{ item.title }} </v-list-tile-content>
              </v-list-tile>
          </v-list>
      </v-navigation-drawer>

      <main>
          <router-view></router-view>
      </main>
  </v-app>
</template>

<script>

export default {
    components: {
    },
    data () {
    return {
        sideNav: false,
    }
  },
  computed: {
        menuItems () {
            let menuItems = [
                { icon: 'face', title: 'Sign up', link: '/signup' },
                { icon: 'lock_open', title: 'Sign in', link: 'signin' },
            ]
            if ( this.userIsAuthenticated ) {
                menuItems = [
                    { icon: 'supervisor_account', title: 'View Meetups',link: '/meetups' },
                    { icon: 'room', title: 'Organize meetup',link: '/meetups/new' },
                    { icon: 'person', title: 'Profile',link: '/profile' },
                ]
            }
            return menuItems
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
  },

  name: 'App'
}
</script>

<style>
    .container{
        margin: 0;
    }
    /*Usado para reescrever o Altert error da aplicacao*/
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>