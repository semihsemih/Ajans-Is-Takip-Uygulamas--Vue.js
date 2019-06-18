<template>
  <v-container>
    <v-layout
      align-center
      justify-center
      row
      fill-height
      mb-2
    >
      <v-flex
        xs12
        sm6
        offset-sm-3
      >
        <h4 class="primary--text">Yeni Çizelge Oluştur</h4>
      </v-flex>
    </v-layout>
    <v-layout
      align-center
      justify-center
      row
      fill-height
    >
      <v-flex
        xs12
        sm6
        offset-sm-3
      >
        <v-text-field
          name="tableCustomer"
          v-model="tableCustomer"
          label="Müşteri Adı"
          id="table-customer"
          required
        />
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateList">
          <v-layout
            align-center
            justify-center
            row
            fill-height
          >
            <v-flex
              xs12
              sm6
              offset-sm-3
            >
              <v-text-field
                name="tableName"
                v-model="tableName"
                label="Tablo Adı"
                id="table-name"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout
            align-center
            justify-center
            row
            fill-height
          >
            <v-flex
              xs12
              sm6
              offset-sm-3
            >
              <v-text-field
                name="tableSubject"
                v-model="tableSubject"
                label="Tablo Konusu"
                id="table-subject"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              xs7
              offset-xs3
              offset-sm5
              offset-md5
              offset-lg5
            >
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit"
              >
                Çizelge Oluştur
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tableName: "",
      tableSubject: "",
      tableCustomer: ""
    };
  },
  computed: {
    formIsValid() {
      return this.tableName !== "" && this.tableSubject !== "" && this.tableCustomer !== "";
    }
  },
  methods: {
    onCreateList() {
      const listData = {
        tableName: this.tableName,
        tableSubject: this.tableSubject,
        tableCustomer: this.tableCustomer

      };
      this.$store.dispatch("createList", listData);
      this.$router.push("/tables");
    }
  }
};
</script>

