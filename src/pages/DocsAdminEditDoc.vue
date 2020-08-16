<template>
  <q-page id="docs-admin-edit-doc-page">
    <EditDocumentForm />
  </q-page>
</template>

<script>
import EditDocumentForm from "components/admin/EditDocumentForm";

export default {
  name: "DocsAdminEditDoc",
  components: {
    EditDocumentForm
  }
}
</script>
