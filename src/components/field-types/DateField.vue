<template>
  <v-menu
    ref="DateMenu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <v-text-field
      outline
      readonly
      prepend-inner-icon="event"
      :label="label"
      slot="activator"
      :value="inputDate"
    />
    <v-date-picker
      v-model="innerValue"
      no-title
      scrollable
      locale="tr"
      :first-day-of-week="1"
    >
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="primary"
        @click="menu = false"
      >
        Vazgeç
      </v-btn>
      <v-btn
        flat
        color="primary"
        @click="$refs.DateMenu.save(innerValue)"
      >
        Tamam
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DateField",
  props: {
    value: {
      type: [String],
      default: () => {}
    },
    format: {
      type: [String],
      default: "DD MMMM YYYY"
    },
    label: {
      type: [String],
      default: "Tarih"
    }
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    inputDate() {
      return this.value ? moment(this.value).format(this.format) : null;
    }
  }
};
</script>
