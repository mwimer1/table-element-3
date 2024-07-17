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
import { computed, defineComponent, ref } from 'vue';
import { usePagination } from 'vue-request';
import axios from 'axios';

const AntTableElement = defineComponent({
  name: 'AntTableElement',
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => [
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
      ],
    },
    dataSource: {
      type: Array,
      required: true,
      default: () => [],
    },
    pagination: {
      type: Object,
      required: true,
      default: () => ({
        total: 200,
        current: 1,
        pageSize: 10,
      }),
    },
  },
  setup(props) {
    const { columns, dataSource, pagination } = props;

    const loading = ref(false);

    const handleTableChange = (pag, filters, sorter) => {
      // Custom logic to handle table changes (pagination, filters, sorting)
      console.log('Table changed', pag, filters, sorter);
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
