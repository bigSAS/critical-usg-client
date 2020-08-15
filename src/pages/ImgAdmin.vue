<template>
  <div id="img-admin-page">
    todo: (l8r) listuj obrazki -> usun
    <q-file
      v-model="file"
      label="Wybierz obrazek"
      hint="Dozwolone formaty: jpg, jpeg, png, gif"
      filled
      style="max-width: 300px"
    />
    <q-btn flat color="green" @click="addFile">Dodaj obrazek</q-btn>
    <br>
<!--    (localdev)<a v-if="uploadedUrlLocalDev" target="_blank" :href="uploadedUrlLocalDev">{{ uploadedUrlLocalDev }}</a>-->
<!--    <br>-->
    <a v-if="uploadedUrlProd" target="_blank" :href="uploadedUrlProd">{{ uploadedUrlProd }}</a>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: "ImgAdmin",
  data () {
    return {
      file: null,
      uploaded: null
    }
  },
  computed: {
    uploadedUrlLocalDev () {
      return this.uploaded ? process.env.BACKEND_URL + 'files/get/' + this.uploaded : null
    },
    uploadedUrlProd () {
      return this.uploaded ? process.env.BACKEND_URL + 'filez/' + this.uploaded : null
    }
  },
  methods: {
    addFile () {
      console.log(this.file)
      const formData = new FormData();
      formData.append("file", this.file);
      api.files.uploadFile(formData).then(response => {
        console.log(response.data.data.uploaded_filename)
        this.uploaded = response.data.data.uploaded_filename
      })
    }
  }
}
</script>
