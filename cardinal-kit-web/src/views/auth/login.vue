<template>
  <section class="wrapper-login">
    <Card>
      <template v-slot:card-header>
        <Logo :path="logo" :className="'flex justify-center'" :width="'100'"></Logo>
        <h1 class="text-center">SIGN IN</h1>
      </template>
      <template v-slot:card-body>
        <form class="login-form" @submit.prevent="handleSubmitLogin">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              class="form-input"
              type="email"
              placeholder=""
              id="email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              class="form-input"
              type="password"
              placeholder=""
              id="password"
              v-model="password"
              autocomplete="on"
            />
            <router-link to="#" class="ev-link forgot"
              >Forgot Password?</router-link
            >
          </div>
          <button class="btn btn-primary" type="submit">Log in</button>
        </form>
       
      </template>
      <template v-slot:card-footer>
        <div className="auth__social-networks">
          <p class="mb-1 subtitle">Login with social networks</p>
          <social-button 
            @click="handleGoogleLogin"
            icon="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            text="Sign in with google"
            className="google-btn"
          />
          <social-button
            @click="handleAppleLogin" 
            icon="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/240px-Apple_logo_black.svg.png" 
            text="Sign in with apple" 
          />
        </div>
        <div class="text-center">
          <span class="ft-10">Not a member? </span>
          <router-link class="ev-link" to="/signup">Sign up</router-link>
        </div>
      </template>
    </Card>
  </section>
</template>
<script>
import Logo from "@/components/auth/Logo";
import Card from "@/components/auth/Card";
import store from "@/store"
import { mapActions } from "vuex";
import SocialButton from '../../components/auth/SocialButton.vue';

export default {
  data() {
    return {
      email: "",
      password: "",
      logo: require('@/assets/logo.png')
    };
  },
  components: {
    Logo,
    Card,
    SocialButton,
  },
  methods: {
    ...mapActions("auth", ["SignIn","LogInWithGoogle", "LogInWithAppleId"]),
    handleSubmitLogin() {
      this.SignIn({ email: this.email, password: this.password })
      .then((response)=>{
        if(response.isLogged){
          this.$router.push({name:"Home"});
        }
      })
    },
    handleGoogleLogin(){
      this.LogInWithGoogle()
      .then((response)=>{
        if(response.isLogged){
          this.$router.push({name:"Home"});
        }
      })
    },
    handleAppleLogin() {
      this.LogInWithAppleId()
      .then((response)=>{
        if(response.isLogged){
          this.$router.push({ name: "Home" });
        }
      })
      .catch((error) => console.log('Error from Server', error))
    }
  },
};
</script>
<style lang="scss" scoped>
.wrapper-login {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  height: 100vh;
  background: $background-login;

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;

    .form-group {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;

      label {
        text-align: start;
        margin-bottom: 3px;
        font-size: 10pt;
      }
      input {
        margin-bottom: 0.5rem;
      }

      a {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        &.forgot {
          font-size: 10pt;
        }
      }
    }
  }
  
  .auth__social-networks {
    margin-bottom: .5rem;
    display: grid;
    gap: 10px;

    .subtitle {
      margin-top: 0;
      text-align: center;
    }
  }
}
</style>
