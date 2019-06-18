<template>
  <v-data-table
    :headers="headers"
    :items="list"
    class="elevation-1" >
  
    <template
      slot="items"
      slot-scope="props" >
    
      <td>{{ props.item.category }}</td>
      <td>{{ props.item.content }}</td>
      <td>{{ props.item.contentDescription }}</td>
      <td>{{ props.item.startDate }}</td>
      <td>{{ props.item.finishDate }}</td>
      <td>{{ props.item.advBudget }}</td>
      <td>{{ props.item.advPeriod }}</td>
      <td class="justify-center layout px-0">
        <v-icon
          small
          class="mr-2"
          @click="$emit('editItem', props.item.id)"
        >
          edit
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="$emit('deleteItem', props.item)"
        >
          delete
        </v-icon>
      </td>
    </template>
    <template slot="no-data">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "ListView",
  props: {
    list: {
      type: [Array, Object],
      default: () => []
    },
    headers: {
      type: [Array, Object],
      default: () => []
    }
  },
  methods: {
    formatDate() {
      return props.item.data
    }
  }
};
</script>

