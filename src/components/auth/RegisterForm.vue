<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-3 offset-md-4 col-lg-3 offset-lg-4">
      <div class="q-ma-sm q-pa-sm">

        <q-form @submit.prevent="submit" uid="register-form" autocomplete="off">
          <div class="row" v-if="registerError" style="margin-bottom: 10px;">
            <div class="col">
              <q-banner
                inline-actions
                rounded
                class="bg-red text-white text-left"
                v-html="registerErrorMessage"
              />
            </div>
          </div>
            <q-input
              type="text"
              uid="email"
              ref="email"
              label="Email"
              v-model.trim="email"
              :disable="loading"
              :rules="[
                val => !!val || 'Field is required',
                val => val.length <= 200 || 'Max lenght is 200',
                val => validateEmail(val)
              ]"
              :error="emailError !== null"
              :error-message="emailError"
              :bottom-slots="true"
              :lazy-rules="true"
              autofocus
            />
            <q-input
              type="text"
              uid="username"
              ref="username"
              label="Nazwa użytkownika"
              v-model.trim="username"
              :disable="loading"
              :rules="[
                val => val.length === 0
                ? true
                : val.length <= 50 || 'Maksymalna ilość znaków 50'
              ]"
              :error="emailError !== null"
              :error-message="usernameError"
              :bottom-slots="true"
              :lazy-rules="true"
            />
            <q-input
              type="password"
              uid="password"
              ref="password"
              label="Hasło"
              v-model.trim="password"
              :disable="loading"
              :rules="[
                val => !!val || 'Pole jest wymagane',
                val => val.length >= 8 && val.length <= 50 || 'Dopuszczalna ilość znaków 8-50'
              ]"
              :error="passwordError !== null"
              :error-message="passwordError"
              :bottom-slots="true"
              :lazy-rules="true"
            />
            <q-input
              type="password"
              uid="password-repeat"
              ref="password-repeat"
              label="Powtórz hasło"
              v-model.trim="passwordRepeat"
              :disable="loading"
              :rules="[
                val => !!val || 'Pole jest wymagane',
                val => val.length >= 8 && val.length <= 50 || 'Dopuszczalna ilość znaków 8-50'
              ]"
              :error="passwordRepeatError !== null"
              :error-message="passwordRepeatError"
              :bottom-slots="true"
              :lazy-rules="true"
            />
            <q-btn
              class="full-width"
              uid="submit-register-form"
              type="submit"
              color="primary"
              label="Zarejestruj"
              :loading="loading"
            />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
  import client from '../../api'
  import { mapActions } from 'vuex'

  export default {
    name: "RegisterForm",
    data() {
      return {
        loading: false,
        email: '',
        emailError: null,
        username: '',
        usernameError: null,
        password: '',
        passwordError: null,
        passwordRepeat: '',
        passwordRepeatError: null,
        registerError: false,
        registerErrorMessage: ''
      }
    },
    methods: {
      submit: function () {
        console.log('submit')
        this.registerError = false
        this.loading = true
        this.emailError = null
        this.passwordError = null
        this.usernameError = null
        this.passwordRepeatError = null

        client.auth.register(this.email, this.username, this.password, this.passwordRepeat).then(() => {
          this.loading = false
          console.log('register-form::submit ok')
          this.$q.notify({
            message: `Dziękujemy ${this.email}. Zostałeś zarejestrowany !`,
            color: 'green',
            classes: 'glossy',
            progress: true,
            timeout: 5000,
            actions: [{ icon: 'close', color: 'white' }]
          })
          this.$router.push('login')
        }).catch(error => {
          this.loading = false
          console.log('login-form::submit err ->', error)
            this.emailError = error.data.errors.find(e => e.name === 'email')?.message?? null
            this.passwordError = error.data.errors.find(e => e.name === 'password')?.message?? null
            this.passwordRepeatError = error.data.errors.find(e => e.name === 'password_repeat')?.message?? null
            this.registerError = error.data.status !== 'OK'
            this.registerErrorMessage = this.registerError && error.data.errors.length > 0
              ? `<p>${error.data.status}</p><ul>${error.data.errors.map(e => '<li>' + e.message + '</li>')}</ul>`
              : ''
        })
      },
      validateEmail: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase()) || 'Invalid email address'
      }
    }
  }
</script>
