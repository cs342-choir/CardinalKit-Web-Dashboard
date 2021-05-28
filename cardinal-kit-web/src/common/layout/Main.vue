<template>
	<section>
		<Header 
			:src-logo="logo" 
			className="bg-danger" 
			logout 
			width-logo="50" 
			@handle-logout="handleLogout" 
			:menu="[{ name: 'Studies', route: '/studies'}]" 
		/>
		<div>
			<router-view/>
		</div>
	</section>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '@/components/auth/Header';
export default {
  components: {
    Header
  },
  data: function () {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  methods: {
    ...mapActions("auth", ["Logout"]),
    handleLogout() {
      this.Logout().then(() => {
        console.log("Called Logout");
        this.$router.push("Login");
      });
    },
  },
};
</script>

<style>

</style>