<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerOpen = !drawerOpen"
        />

        <q-toolbar-title>
          Critical USG
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawerOpen"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area :style="`height: calc(${user ? '100% - 150px' : '100% - 7px'}); ${user ? 'margin-top: 150px' : 'margin-top: 5px'}; border-right: 1px solid #ddd`">
          <q-list padding>
            <q-item
              clickable
              v-ripple
              :active="'/' === activeRoute"
              @click="goTo('/')"
            >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              :active="'instructions' === activeRoute"
              @click="goTo('instructions')"
            >
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Instrukcje
              </q-item-section>
            </q-item>
            <q-item
              v-if="!user"
              clickable
              v-ripple
              :active="'login' === activeRoute"
              @click="goTo('login')"
            >
              <q-item-section avatar>
                <q-icon name="login" color="green"/>
              </q-item-section>

              <q-item-section>
                Login/register
              </q-item-section>
            </q-item>
            <q-item
              v-if="user"
              clickable
              v-ripple
              :active="'logout' === activeRoute"
              @click="logout()"
            >
              <q-item-section avatar>
                <q-icon name="logout" color="red" />
              </q-item-section>

              <q-item-section>
                Logout
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px" v-if="user">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ user.username }}</div>
            <div>{{ userEmail }}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  data () {
    return {
      drawerOpen: false,
      activeRoute: '/'
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    userEmail: function () {
      return this.user?.email ?? ''
    }
  },
  methods: {
    ...mapActions({
      setUser: 'setUser'
    }),
    goTo: function (route) {
      if (this.activeRoute !== route) {
        this.activeRoute = route
        this.$router.push(route)
        this.drawerOpen = false
      }
    },
    logout: function () {
      window.localStorage.removeItem('CUSG_TOKEN')
      this.setUser(null)
      this.activeRoute = '/'
      this.$router.push('/')
      this.drawerOpen = false
      this.$q.notify({
        message: 'You have been logged out. Bye :)',
        color: 'warning'
      })
    }
  }
}
</script>
