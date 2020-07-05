<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
  import client from './api'
  import { mapActions } from 'vuex'

  export default {
    name: 'App',
    methods: {
      ...mapActions({
        setUser: 'setUser'
      })
    },
    mounted() {
      const token = window.localStorage.getItem('CUSG_TOKEN')
      if (token !== null && token !== undefined) {
        client.auth.getUserData().then(response => {
          this.setUser(response.data.data)
        })
      }
    }
  }
</script>
