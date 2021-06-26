<template>
  <nav class="flex justify-between flex-column" :class="{[className]: className , 'collapse-nav': collapse }">
    <div class="collapse">
      <button @click="handleCollapse" type="button" class="btn-collapse">
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="33" width="100" height="15"></rect>
          <rect y="60" width="100" height="15"></rect>
        </svg>
      </button>
    </div>
    <slot name="side-content">
      <div>
        <Logo class="flex justify-center mb-5" :path="logo"
        :width="widthLogo" />
        <ul v-if="menu" class="mb-5">
          <template v-for="(link, index) in menu" :key="index">
            <li class="flex sb-link">
              <Icon v-if="link?.icon" :icon="link.icon" />
              <router-link :to="link.route">
                {{link.name}}
              </router-link>
            </li>
          </template>
        </ul>
      </div>
      <div v-if="logout">
        <span class="logout pointer" @click="handleClickLogout">logout</span>
      </div>
    </slot>
  </nav>
</template>

<script>
import Logo from "@/components/auth/Logo";
import Icon from "./Icon";
import { ref } from 'vue';

export default {
  props: {
    menu: {
      type: Array,
    },
    logout: {
      type: Boolean,
      default: false
    },
    widthLogo: {
      type: String,
      default: '50'
    },
    className: {
      type: String,
      default: 'bg-info'
    },
    logo: String
  },
  components: { Logo, Icon },
  setup(props, ctx) {
    const collapse = ref(false);

    function handleClickLogout() {
      ctx.emit('emitLogout', true);
    }

    const handleCollapse = () => (collapse.value = !collapse.value);

    return {
      handleClickLogout,
      handleCollapse,
      collapse
    }
  },
}
</script>
<style lang="scss" scoped>
nav {
  height: 100%;
  padding: 1.5rem;
  min-width: 270px;
  max-width: 270px;
  transition: all .3s;
  position: relative;

  &.collapse-nav {
    margin-left: -270px;

    .collapse {
      margin-right: -50px;
    }
  }

  .collapse {
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 0;
    margin-right: -20px;
    transition: .3s;
  }

  .btn-collapse {
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:before {
      content:'';
      border-radius: 50%;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.4);
    }
    
    svg {
      width: 15px;
      position: relative
    }
  }

  ul {
    list-style: none;
    padding: 0;

    .sb-link {
      padding: 1rem 0;
      border-bottom: 1px solid;
      font-size: 13pt;
      font-weight: 600;
      letter-spacing: 0.6px;
       
      a {
        text-decoration: none;
      }
    }
  }

  .logout {
    padding: 1rem;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    box-shadow: inset 0px 0px 20px 20px #0000001f;
  }

  @media (max-width: 768px) {
    margin-left: -270px;

    &.collapse-nav {
      margin-left: 0px;

      .collapse {
        margin-right: -20px;
      }
    }

    .collapse {
        margin-right: -50px;
    }
  }
}
</style>
