<template>
  <v-container>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div>
              <h6 class="title primary--text">{{ listInfo.tableName }}</h6>
              <div class="mt-2">{{ listInfo.tableSubject }}</div>
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
            >Yeni İçerik
            </v-btn>
          </v-card-title>
        </v-card>

        <ListView
          :headers="headers"
          :list="workLists"
          @editItem="editItem"
          @deleteItem="deleteItem"
        />
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="dialog"
      max-width="700px"
    >
      <AppForm
        :formData="formData"
        v-if="formData !== null"
        @saveData="saveStore"
        @closeDialog="dialog = false"
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
import ListView from "./partials/ListView";
import AppForm from "./partials/AppForm";

export default {
  props: ["id"],
  watch: {
    '$route' (to, from) {
      console.log('Değişti')
    },
    dialog(val) {
      if (val === false) this.formData = null;
    },
    deleteDialog(val) {
      if (val === false) this.deleteObj = null;
    }
  },
  data() {
    return {
      headers: [
        { text: "İçerik Türleri", value: "category", sortable: false },
        { text: "Konular", value: "content", sortable: false },
        { text: "Açıklama", value: "contentDescription", sortable: false },
        { text: "Başlangıç Tarihi", value: "startDate", sortable: false },
        { text: "Bitiş Tarihi", value: "finishDate", sortable: false },
        { text: "Bütçe", value: "advBudget", sortable: false },
        { text: "Reklam Süresi", value: "advPeriod", sortable: false },
        { text: "İşlemler", value: "contentDescription", sortable: false }
      ],
      dialog: false,
      formData: null,
      sampleDataObj: {
        category: "",
        content: "",
        contentDescription: "",
        startDate: "",
        finishDate: "",
        advBudget: "",
        advPeriod: ""
      },
      deleteObj: null,
      deleteDialog: false
    };
  },
  computed: {
    listInfo() {
      return this.$store.getters.loadedListInfo(this.id);
    },
    workLists() {
      return this.$store.getters.workLists;
    },
    tableId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.sendTableId()
  },
  methods: {
    sendTableId() {
      var tableId = this.$route.params.id;
      this.$store.dispatch('loadWorkLists', tableId)
    },
    addNew() {
      this.formData = _.cloneDeep(this.sampleDataObj);
      this.formData.tableId = this.tableId;
      this.dialog = true;
    },
    // $event = item.id
    editItem($event) {
      let item = this.workLists.find(obj => obj.id === $event);
      if (!!item) {
        this.formData = _.cloneDeep(item);
        this.dialog = true;
      }
    },
    // $event = item
    deleteItem($event) {
      this.deleteObj = _.cloneDeep($event);
      this.deleteDialog = true;
    },
    deleteSimulation() {
      return new Promise((resolve, reject) => {
        resolve({ data: this.deleteObj });
      });
    },
    deleteData() {
      this.deleteSimulation().then(response => {
        let index = _.findIndex(this.workLists, obj => obj.id === response.data.id);
        if (index !== -1) {
          this.$store.dispatch("removeWorkList", response.data); 
        }
        this.workLists.splice(index, 1)
        this.deleteDialog = false
      });
    },
    saveSimulation() {
      return new Promise((resolve, reject) => {
        resolve({ data: this.formData });
      });
    },
    saveStore() {
      this.saveSimulation().then(response => {
        let index = _.findIndex(this.workLists, obj => obj.id === response.data.id);
        if (index <= -1) this.$store.dispatch("saveWorkList", response.data);
        else this.$store.dispatch("updateWorkList", response.data);

        this.dialog = false;
      });
    },
    close() {
      this.dialog = false;
    }
  },
  components: {
    ListView,
    AppForm
  }
};
</script>

