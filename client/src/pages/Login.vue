<template>
  <v-container
    fluid
    fill-height
    class="loginOverlay"
  >
    <v-layout
      flex
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm4
        elevation-6
      >
        <v-toolbar
          class="pt-5 primary"
          dark
        >
          <v-toolbar-title>
            <h4>Login</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form
                ref="form"
              >
                <v-text-field
                  id="email"
                  v-model="email"
                  label="Enter your e-mail address"
                  :rules="emailRules"
                  required
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  label="Enter your password"
                  type="password"
                  :rules="passwordRules"
                  required
                />
                <v-layout justify-space-between>
                  <v-btn
                    id="submit"
                    class="primary"
                    @click="submit"
                  >
                    Login
                  </v-btn>
                  <a href="">Forgot Password</a>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EmployeeApi from '@/api/employee'

export default {
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => (v && v.length >= 6) || 'Password must be more than 5 characters'
    ]
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        const params = {
          email: this.email,
          password: this.password
        }
        EmployeeApi.login(params).then(result => {
          localStorage.setItem('token', 'Bearer ' + result.data.accessToken)
          this.$router.push('feedback')
        })
      }
    }
  }
}
</script>
