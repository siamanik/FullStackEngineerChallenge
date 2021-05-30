<template>
  <div id="app-layout">
    <Navigation />
    <router-view />
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Navigation from '@/components/Layout/Navigation.vue'
// import Footer from '@/components/Layout/Footer.vue'

export default {
  components: {
    Navigation
    // Footer
  }
}
</script>
