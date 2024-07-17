export default {
  inherit: {
    type: 'ww-text',
    exclude: ['text'],
  },
  editor: {
    label: { en: 'Ant Design Table', fr: 'Tableau Ant Design' },
    icon: 'table',
    customSettingsPropertiesOrder: [
      'columns',
      'dataSource',
      'pagination',
    ],
    customStylePropertiesOrder: [
      'borderColor',
      'borderWidth',
      'cellPadding',
    ],
  },
  states: ['hover', 'active'],
  actions: [{ label: 'Row Click', action: 'onRowClick' }],
  triggerEvents: [
    { name: 'rowClick', label: { en: 'On row click' }, event: { row: '' }, default: true },
  ],
  properties: {
    columns: {
      label: { en: 'Columns' },
      type: 'Array',
      bindable: true,
      responsive: true,
      defaultValue: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: true,
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
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
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
      ],
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'An array of objects representing table columns',
      },
      /* wwEditor:end */
    },
    dataSource: {
      label: { en: 'Data Source' },
      type: 'Array',
      bindable: true,
      responsive: true,
      defaultValue: [],
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'An array of objects representing table data',
      },
      /* wwEditor:end */
    },
    pagination: {
      label: { en: 'Pagination' },
      type: 'Object',
      bindable: true,
      responsive: true,
      defaultValue: {
        total: 200,
        current: 1,
        pageSize: 10,
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'object',
        tooltip: 'An object representing pagination settings',
      },
      /* wwEditor:end */
    },
  },
};
