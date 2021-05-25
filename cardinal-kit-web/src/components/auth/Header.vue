<template>
  <header>
    <Logo :path="srcLogo"  :width="widthLogo" />
    <div class="header-menu" :class="{ show: showMenu }">
      <span @click="handleShowMenu" class="close-menu pointer">
        ✖
      </span>
      <slot class="responsive-menu" name="menu"></slot>
    </div>
    <i @click="handleShowMenu" class="active-menu pointer">
      <img src="@/assets/icons/menu.svg" alt="menu">
    </i>
  </header>
</template>

<script>
import Logo from "@/components/auth/Logo";
import { ref } from 'vue';

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
  },
  setup() {
    const showMenu = ref(false);

    function handleShowMenu() {
      showMenu.value = !showMenu.value
    }

    return {
      showMenu,
      handleShowMenu
    }
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
    transition: all .5s ease;

    .close-menu {
      display: none;
    }
    
    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      flex-flow: column;
      background: whitesmoke;
      align-items: center;
      font-size: 1.3em;
      padding: 2.5rem 1rem;
      transform: translateX(100%);

      &.show {
        transform: translateX(0);
      }

      .close-menu {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1rem;
      }
    }
  }

  .active-menu {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
}
</style>
