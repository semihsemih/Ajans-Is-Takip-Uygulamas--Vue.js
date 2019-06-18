<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-text-field 
                outline
                label="Tablo Adı"
                v-model="formData.tableName"
              />
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field 
                outline
                label="Müşteri"
                v-model="formData.tableCustomer"
              />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                outline
                label="Konu"
                v-model="formData.tableSubject"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('closeDialog')"
        >
          Vazgeç
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('saveData')"
        >
          Kaydet
        </v-btn>
      </v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TablesForm",
  props: {
    formData: {
      types: Object,
      default: () => {}
    }
  },
  computed: {
    formTitle() {
      return !this.formData.hasOwnProperty('id') ? "Yeni Tablo Oluştur" : "Tabloyu Düzenle";
    }
  }
}
</script>

