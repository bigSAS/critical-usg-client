<template>
  <q-page id="docs-admin-new-doc-page">
    <AddNewDocumentForm />
  </q-page>
</template>

<script>
import AddNewDocumentForm from "components/admin/AddNewDocumentForm";

export default {
  name: "DocsAdminNewDoc",
  components: {
    AddNewDocumentForm
  }
}
</script>
