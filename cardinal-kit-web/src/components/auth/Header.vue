<template>
  <header>
      <Logo :path="srcLogo"  :width="widthLogo" />
      <div class="header-menu">
       <slot name="menu"></slot>
       <!-- <span class="ev-link" @click="handleLogout">Log out</span> -->
      </div>
    </header>
</template>

<script>
import Logo from "@/components/auth/Logo";

export default {
  props: {
    srcLogo: {
      type: String
    },
    widthLogo: {
      type: String,
      default: '50'
    },
  },
  components: {
      Logo,
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: .5rem 2rem;
  background-color: whitesmoke;
  box-shadow: $shadow-sm;

  .header-menu {
    display: flex;
    gap: 15px;
  }
}
</style>
