<template>
  <v-container>
    <v-layout
      row
      justify-center
      align-center
      fill-height
      v-if="error"
    >
      <v-flex
        xs12
        sm6
        offset-sm-3
      >
        <AlertCmp
          @dismissed="onDismissed"
          :text="error.message"
        ></AlertCmp>
      </v-flex>
    </v-layout>
    <v-layout
      row
      justify-center
      align-center
      fill-height
    >
      <v-flex
        xs12
        sm6
        offset-sm-3
      >
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Kullanıcı E-Posta Adresi"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    />
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Parola"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    />
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confrimPassword"
                      label="Parola Doğrulama"
                      id="confrimPassword"
                      v-model="confrimPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    />
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      type="submit"
                      :disabled="loading"
                      :loading="loading"
                    >
                      Kayıt Ol
                      <span
                        slot="loader"
                        class="custom-loader"
                      >
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AlertCmp from "./../../components/shared/Alert.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      confrimPassword: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confrimPassword
        ? "Girilen parolalar eşleşmemektedir"
        : true;
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignUp() {
      // Vuex
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      console.log("Dismissed Alert!!!");
      this.$store.dispatch("clearError");
    }
  },
  components: {
    AlertCmp
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>



