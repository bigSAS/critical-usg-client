<template>
  <q-form @submit.prevent="submit" uid="login-form">
    <div class="row" v-if="authError" style="margin-bottom: 10px;">
      <div class="col">
        <q-banner inline-actions rounded class="bg-red text-white text-center">
          {{ authErrorMessage }}
        </q-banner>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <q-input
          type="text"
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
          type="password"
          uid="password"
          ref="password"
          label="Password"
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
      <div class="col-8 offset-2">
        <q-btn
          class="full-width"
          uid="submit-login-form"
          type="submit"
          color="primary"
          label="Log in"
          :loading="loading"
        />
      </div>
    </div>
  </q-form>
</template>

<script>
  import client from '../../api'
  import { mapActions } from 'vuex'

  export default {
    name: "LoginForm",
    data() {
      return {
        loading: false,
        email: '',
        emailError: null,
        password: '',
        passwordError: null,
        authError: false,
        authErrorMessage: ''
      }
    },
    methods: {
      ...mapActions({
        setUser: 'setUser'
      }),
      submit: function () {
        this.authError = false
        this.loading = true
        this.emailError = null
        this.passwordError = null
        client.auth.authenticate(this.email, this.password).then(response => {
          this.loading = false
          console.log('login-form::submit ok ->', response)
          const token = response.data.data.token
          console.log('token', token)
          window.localStorage.setItem('CUSG_TOKEN', token)
          client.auth.getUserData().then(udataResponse => {
            console.log('login-form::getUserData ok ->', udataResponse)
            this.setUser(udataResponse.data.data)
          })
        }).catch(error => {
          this.loading = false
          console.log('login-form::submit err ->', error)
            this.emailError = error.data.errors.find(e => e.name === 'email')?.message?? null
            this.passwordError = error.data.errors.find(e => e.name === 'email')?.message?? null
            this.authError = error.data.status === 'AUTH_ERROR'
            this.authErrorMessage = this.authError ? 'Invalid credentials' : ''
        })
      },
      validateEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase()) || 'Invalid email address'
      }
    }
  }
</script>
