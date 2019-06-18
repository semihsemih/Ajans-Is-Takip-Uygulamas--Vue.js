<template>
  <v-container>
    <v-layout
      row
      fill-height
      wrap
      class="mb-2" >
    
      <v-flex
        xs12
        sm10
        md8
        offset-sm1
        offset-md2 >
      
        <v-card>
          <v-card-title>
            <div>
              <h6 class="title primary--text">Sosyal Medya İş Takip Tabloları</h6>
            </div>
            <v-divider
              class="mx-2"
              inset
              vertical
            />
            <v-spacer/>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="addNew"
            >Yeni Tablo
            </v-btn>
          </v-card-title>
        </v-card>

        <TablesListView
          :headers='headers'
          :list='list'
          @editItem="editItem"
          @deleteItem="deleteItem"
        />
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="dialog"
      max-width="700px" >

      <TablesForm
        :formData='formData'
        v-if="formData !== null"
        @saveData='saveStore'
        @closeDialog='dialog = false'
      />

    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      width="250px"
    >
      <v-card>
        <v-card-text>
          <p>
            <strong>Dikkat!</strong> Silme işlemi geri alınamaz. Onayınız gerekmektedir.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            flat
            color="primary"
            @click="deleteData"
          >
            Onaylıyorum
          </v-btn>
          <v-btn
            flat
            color="warning"
            @click="deleteDialog = false"
          >
            Vazgeç
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import TablesListView from './partials/TablesListView'
import TablesForm from './partials/TablesForm'
export default {
  props: ['id'],
  watch: {
    dialog(val) {
      if (val === false) this.formData = null
    },
    deleteDialog(val) {
      if (val === false) this.deleteObj = null;
    }
  },
  data() {
    return {
      headers: [
        { text: "Tablo Adı", value: "tableName", sortable: false },
        { text: "Konu", value: "tableSubject", sortable: false },
        { text: "Müşteri", value: "tableCustomer", sortable: false },
        { text: "İşlemler", value: "contentDescription", sortable: false }
      ],
      dialog: false,
      formData: null,
      sampleDataObj: {
        tableName: '',
        tableSubject: '',
        tableCustomer: ''
      },
      deleteObj: null,
      deleteDialog: false
    };
  },
  computed: {
    list() {
      return this.$store.getters.loadedLists;
    },
    
  },
  methods: {
    addNew() {
      this.formData = _.cloneDeep(this.sampleDataObj);
      this.dialog = true;
    },
    editItem($event) {
      let item = this.list.find(obj => obj.id === $event)
      if (!!item) {
        this.formData = _.cloneDeep(item)
        this.dialog = true
      }
    },
    saveSimulation() {
      return new Promise((resolve, reject) => {
        resolve({ data: this.formData })
      })
    },
    saveStore() {
      this.saveSimulation().then(response => {
        let index = _.findIndex(this.list, obj => obj.id === response.data.id)
        if (index <= -1) this.$store.dispatch('createList', response.data)
        else this.$store.dispatch("updateTableList", response.data)

        this.dialog = false;
      })
    },
    deleteItem($event) {
      this.deleteObj = _.cloneDeep($event)
      this.deleteDialog = true
    },
    deleteSimulation() {
      return new Promise((resolve, reject) => {
        resolve({ data: this.deleteObj})
      })
    },
    deleteData() {
      this.deleteSimulation().then(response => {
        let index = _.findIndex(this.list, obj => obj.id === response.data.id)
        if (index !== -1) {
          this.$store.dispatch('removeTableList', response.data.id)
        }
        this.list.splice(index, 1)
        this.deleteDialog = false
      })
    }
  },
  components: {
    TablesListView,
    TablesForm
  }
};
</script>
