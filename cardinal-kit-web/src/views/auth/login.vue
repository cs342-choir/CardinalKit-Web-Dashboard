<template>
  <section class="wrapper-login">
    <Card>
      <template v-slot:card-header>
        <Logo :className="'flex justify-center'" :width="'145'"></Logo>
        <h1>SIGN IN</h1>
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
          <button class="btn btn-eventtia" type="submit">Log in</button>
        </form>
       
      </template>
      <template v-slot:card-footer>
         <div className="auth__social-networks">
          <p class="mb-1 subtitle">Login with social networks</p>
          <div className="google-btn" :onClick="handleGoogleLogin">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
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

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    Logo,
    Card,
  },
  methods: {
    ...mapActions("auth", ["SignIn","LogInWithGoogle"]),
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
  background: rgba(66, 10, 67, 0.7);

  h1 {
    text-align: center;
  }

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
    .subtitle {
      margin-top: 0;
      text-align: center;
    }

    .google-btn {
      margin-bottom: .5rem;
    }
  }
}
</style>
