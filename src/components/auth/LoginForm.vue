<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-3 offset-md-4 col-lg-3 offset-lg-4">
      <div class="q-ma-sm q-pa-sm">
        <q-form @submit.prevent="submit" uid="login-form">
          <div class="row" v-if="authError" style="margin-bottom: 10px;">
            <div class="col">
              <q-banner inline-actions rounded class="bg-red text-white text-center">
                {{ authErrorMessage }}
              </q-banner>
            </div>
          </div>
            <q-input
              type="text"
              uid="email"
              ref="email"
              label="Email"
              v-model.trim="email"
              :disable="loading"
              :rules="[val => !!val || 'Pole jest wymagane', val => validateEmail(val)]"
              :error="emailError !== null"
              :error-message="emailError"
              :bottom-slots="true"
              :lazy-rules="true"
              autofocus
            />
            <q-input
              type="password"
              uid="password"
              ref="password"
              label="Hasło"
              v-model.trim="password"
              :disable="loading"
              :rules="[val => !!val || 'Pole jest wymagane']"
              :error="passwordError !== null"
              :error-message="passwordError"
              :bottom-slots="true"
              :lazy-rules="true"
            />
            <q-btn
              class="full-width"
              uid="submit-login-form"
              type="submit"
              color="primary"
              label="Zaloguj"
              :loading="loading"
            />
            <div class="row">
              <div class="col text-center">
                <p style="margin-top: 15px">Nie masz konta?
                  <span>
                    <router-link to="register" uid="register-link">Zarejestruj się</router-link>
                  </span>
                </p>
              </div>
            </div>
        </q-form>
      </div>
    </div>
  </div>
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
            this.$router.push('/')
          })
        }).catch(error => {
          this.loading = false
          console.log('login-form::submit err ->', error)
            this.emailError = error.data.errors.find(e => e.name === 'email')?.message?? null
            this.passwordError = error.data.errors.find(e => e.name === 'password')?.message?? null
            this.authError = error.data.status === 'AUTH_ERROR'
            this.authErrorMessage = this.authError ? 'Zły login lub hasło' : ''
        })
      },
      validateEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase()) || 'Invalid email address'
      }
    }
  }
</script>
