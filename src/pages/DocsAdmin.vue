<template>
  <div id="docs-admin-page">
    <ul>
      <li>
        <router-link to="/admin/docs-admin/new-doc">Dodaj dokument</router-link>
      </li>
      <li>
<!--        todo last -->
        <router-link to="/admin/docs-admin/edit-doc">Edytuj dokument</router-link>
      </li>
      <li>
<!--        todo -->
        <router-link to="/admin/docs-admin/delete-doc">Usuń dokument</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DocsAdmin"
}
</script>
