<template>
  <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <div class="q-ma-sm q-pa-sm">
          <q-page id="admin-page">
            <div v-if="mainRoute">
              <ul>
                <li>
                  <router-link to="/admin/docs-admin">Zarządzaj instrukcjami</router-link>
                </li>
                <li>
        <!--          todo: endpoint na backend -> do media -> impl tu dodawanie-->
                  <router-link to="/admin/img-admin">Zarządzaj obrazkami</router-link>
                </li>
              </ul>
            </div>
            <div v-else>
              <Navigation />
              <router-view />
            </div>
          </q-page>
        </div>
      </div>
  </div>
</template>

<script>
import Navigation from "components/admin/Navigation";
export default {
  name: "Admin",
  components: {
    Navigation
  },
  beforeDestroy () {
    this.$emit('close-drawer')
  },
  computed: {
    mainRoute() {
      return this.$route.path === '/admin'
    }
  }
}
</script>
