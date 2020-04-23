<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidebar 
      :show="displaySidenav"
      @close="displaySidenav = false"/>
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheSidebar from '@/components/Navigation/TheSidenav'

export default {
  // middleware: 'log',
  components: {
    TheHeader,
    TheSidebar
  },
  data() {
    return {
      displaySidenav: false
    }
  }
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
