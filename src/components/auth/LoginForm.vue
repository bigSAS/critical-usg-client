<template>
  <q-form @submit.prevent="submit" uid="login-form">
    <div class="row">
      <div class="col-12 col-md-6">
        <q-input
          uid="email"
          ref="email"
          label="Email"
          v-model.trim="email"
          :disable="loading"
          :rules="[val => !!val || 'Field is required', val => validateEmail(val)]"
          :error="emailError !== null"
          :error-message="emailError"
          :bottom-slots="true"
          :lazy-rules="true"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          uid="password"
          ref="password"
          label="Standard"
          v-model.trim="password"
          :disable="loading"
          :rules="[val => !!val || 'Field is required']"
          :error="passwordError !== null"
          :error-message="passwordError"
          :bottom-slots="true"
          :lazy-rules="true"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn uid="submit-login-form" type="submit" color="primary" label="Log in" :loading="loading" />
      </div>
    </div>
  </q-form>
</template>

<script>
  import client from '../../api'
  export default {
    name: "LoginForm",
    data() {
      return {
        loading: false,
        email: '',
        emailError: null,
        password: '',
        passwordError: null,
      }
    },
    methods: {
      submit: function () {
        this.loading = true
        this.emailError = null
        this.passwordError = null
        client.auth.authenticate(this.email, this.password).then(response => {
          this.loading = false
          console.log('login-form::submit ok ->', response)
        }).catch(error => {
          this.loading = false
          console.log('login-form::submit err ->', error)
            this.emailError = error.data.errors.find(e => e.name === 'email')?.message?? null
            this.passwordError = error.data.errors.find(e => e.name === 'email')?.message?? null

        })
      },
      validateEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase()) || 'Invalid email address'
      }
    }
  }
</script>
