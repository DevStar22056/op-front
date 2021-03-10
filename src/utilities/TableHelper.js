export class TableHelper {
  static defaultOptions(createHandler, editHandler, deleteHandler) {
    return {
      searchDef: {
        debounceTime: 600,
        inputProps: {
          placeholder: "Search"
        },
        colProps: {
          span: 10,
          offset: 14
        }
      },
      paginationDef: {
        pageSize: 10,
        pageSizes: [10, 20, 50],
        currentPage: 1
      },

      checkFilterDef: {},
    }
  }
  static selectParams(filter, defaultPropOrder, defaultOrder) {
    let paramFilter = undefined;
    if (filter.filters && filter.filters.length) {
      paramFilter = filter.filters[0].vals[0];
    }

    let orderProp = 'name';
    if (filter.sortInfo && filter.sortInfo.prop) {
      orderProp = filter.sortInfo.prop;
    } else if (defaultPropOrder) {
      orderProp = defaultPropOrder;
    }

    let orderType = 'ascending';
    if (filter.sortInfo && filter.sortInfo.order) {
      orderType = filter.sortInfo.order;
    } else if (defaultOrder) {
      orderType = defaultOrder;
    }

    let pageSize = filter.pageSize || 10
    let page = filter.page || 1;

    return {
      params: {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        filter: paramFilter,
        orderBy: orderProp,
        orderType: orderType
      }
    }
  }
}