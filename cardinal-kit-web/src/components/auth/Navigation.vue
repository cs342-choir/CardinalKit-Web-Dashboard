<template>
  <nav class="flex flex-col items-center justify-between bg-gray-evt">
    <div class="w-full text-center">
      <Logo :path="logo"
      :className="'flex justify-center px-2 py-4 mb-3 bg-purple-dark'"
      :width="'130'" />
      <ul class="p-2">
        <template v-for="(link, index) in NAVIGATION" :key="index">
          <li v-if="hasPermission(link)" class="flex py-3">
            <i class="mr-2" v-html="link.icon"></i>
            <router-link class="font-bold text-purple-evt" :to="link.route">
              {{link.name}}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
    <div class="w-full px-2 py-4 text-center footer-nav">
      <span @click="handleLogout" class="font-bold cursor-pointer text-purple-evt">logout</span>
    </div>
  </nav>
</template>

<script>
// import { computed, defineComponent } from 'vue';
// import Logo from '@/components/common/Logo.vue';
// import { images } from '@/utils/const';
// import AuthService from '@/services/auth';
// import { useStore } from 'vuex';
// import { NAVIGATION } from '@/lib/configNavigation';

// export default defineComponent({
//   name: 'Navigation',
//   components: { Logo },
//   setup() {
//     const { logo } = images;
//     const { handleLogout } = AuthService.setup();
//     const store = useStore();
//     const role = computed(() => store.getters.getRole);

//     function hasPermission(link: any): boolean {
//       return link.roles.includes(role.value);
//     }

//     return {
//       logo,
//       handleLogout,
//       NAVIGATION,
//       hasPermission,
//     };
//   },
// });
</script>

<style lang="scss" scoped>
  nav {
    .footer-nav {
      border-top: solid 1px #851486;
    }
  }
</style>
