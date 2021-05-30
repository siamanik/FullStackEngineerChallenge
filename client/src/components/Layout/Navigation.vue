<template>
  <v-toolbar
    color="primary"
    dark
  >
    <v-img
      :src="require('@/assets/logo.png')"
      contain
      width="40"
    />
    <v-tabs
      left
    >
      <v-tab
        id="navFeedback"
        @click="$router.push('feedback').catch(()=>{})"
      >
        Feedback
      </v-tab>
      <v-tab
        v-if="isAdmin"
        id="navEmployee"
        @click="$router.push('employee').catch(()=>{})"
      >
        Employee
      </v-tab>
      <v-tab
        v-if="isAdmin"
        id="navReview"
        @click="$router.push('review').catch(()=>{})"
      >
        Review
      </v-tab>
    </v-tabs>
    <v-spacer />
    <v-btn
      color="accent"
      @click="logout()"
    >
      Logout
    </v-btn>
  </v-toolbar>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  data: () => ({
    isAdmin: false
  }),
  created () {
    var token = localStorage.getItem('token').split(' ')[1]
    var decoded = jwtDecode(token)
    this.isAdmin = decoded.admin
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('login')
    }
  }
}
</script>
