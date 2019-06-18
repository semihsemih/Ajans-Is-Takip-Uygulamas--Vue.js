<template>
  <v-data-table 
    :headers="headers"
    :items="list"
    class="elevation-1">

    <template
      slot="items"
      slot-scope="props" >

      <td>
        <router-link :to="{name: 'Table', params: {id: props.item.id}}">
          {{ props.item.tableName }}
        </router-link>
      </td>
      <td>{{ props.item.tableSubject }}</td>
      <td>{{ props.item.tableCustomer }}</td>
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
  name: 'TablesListView',
  props: {
    list: {
      type: [Array, Object],
      default: () => []
    },
    headers: {
      type: [Array, Object],
      default: () => []
    }
  }
}
</script>

