<template>
  <v-app>
    <v-toolbar
      dark
      class="primary"
      dense
      fixed
      app
      clipped-left
    >
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >Ajans İş Takip Uygulaması</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
          flat
          v-if="userIsAuthenticated"
          @click="onLogout"
        >
          <v-icon
            left
            dark
          >fa-sign-out</v-icon>
          Çıkış Yap
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="sideNav"
      temporary
      fixed
      app
      clipped
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon>fa-sign-out</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Çıkış Yap</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "fa-user-plus", title: "Kullanıcı Oluştur", link: "/signup" },
        { icon: "fa-sign-in ", title: "Giriş Yap", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "fa-table", title: "Çizelgeleri Gör", link: "/tables" },
          { icon: "fa-plus", title: "Yeni Çizelge Oluştur", link: "/table/new" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/signin");
    }
  }
};
</script>
