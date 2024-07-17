<template>
  <a-table
    :columns="columns"
    :row-key="record => record.login.uuid"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template>
  </a-table>
</template>

<script setup>
import { computed, defineComponent } from 'vue';
import { usePagination } from 'vue-request';
import axios from 'axios';

// Define the component name and properties for WeWeb compatibility
const AntTableElement = defineComponent({
  name: 'AntTableElement',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        headers: ["Name", "Age", "City", "Occupation"],
        rows: [
          ["Alice", 28, "New York", "Engineer"],
          ["Bob", 34, "San Francisco", "Designer"],
          ["Charlie", 25, "Boston", "Developer"],
          ["David", 42, "Chicago", "Manager"],
          ["Eve", 29, "Los Angeles", "Artist"],
        ],
      }),
    },
  },
  setup(props) {
    // Define the columns for the table
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
          {
            text: 'Male',
            value: 'male',
          },
          {
            text: 'Female',
            value: 'female',
          },
        ],
        width: '20%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ];

    // Define the data fetching function
    const queryData = params => {
      return axios.get('https://randomuser.me/api?noinfo', {
        params,
      });
    };

    // Use the usePagination hook to manage pagination and data fetching
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: res => res.data.results,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
      },
    });

    // Compute the pagination object for the table
    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
    }));

    // Handle table changes (pagination, filters, sorting)
    const handleTableChange = (pag, filters, sorter) => {
      run({
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };

    return {
      columns,
      dataSource,
      pagination,
      loading,
      handleTableChange,
    };
  },
});

export default AntTableElement;
</script>

<style scoped>
/* Add any custom styles here */
</style>
