import HashTable from '../../helpers/hashTable';
const initialState = {
  products: [],
  productSearch: [],
  copyProducts: [],
  productedit: [],
  detail: [],
  error: '',
  loading: false,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_ALL_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'PRODUCTS_ALL_SUCCESS':
      const newAllTable = new HashTable();

      action.payload.forEach((product) => {
        newAllTable.addItem(product.name);
      });

      return {
        ...state,
        products: action.payload,
        copyProducts: action.payload,
        productSearch: newAllTable,
        orders: [],
        orderHistory: [],
        order: [],
        totalorders: [],
        detail: [],
        loading: false,
        error: '',
      };

    case 'PRODUCTS_ALL_FAIL':
      return { ...state, loading: false, products: '', error: action.payload };

    case 'PRODUCTS_CREATE_SUCCESS':
      return { ...state, loading: false, error: '' };

    case 'PRODUCTS_CREATE_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'PRODUCTS_CREATE_FAIL':
      return { ...state, loading: false, error: action.payload };
      
      case 'PRODUCTS_FILTER_SUCCESS':
        const filterTable = new HashTable();
        
        action.payload.forEach((product) => {
          filterTable.addItem(product.name);
        });
        
        return {
          ...state,
          products: action.payload,
          copyProducts: action.payload,
          productSearch: filterTable,
          orders: [],
          orderHistory: [],
          totalorders: [],
          detail: [],
          loading: false,
          error: '',
        };
        
        case 'PRODUCTS_SEARCH_SUCCESS':
          const searchTable = new HashTable();
          
          action.payload.forEach((product) => {
            searchTable.addItem(product.name);
          });
          
          return {
            ...state,
            products: action.payload,
            copyProducts: action.payload,
            productSearch: searchTable,
            orders: [],
            orderHistory: [],
            totalorders: [],
            detail: [],
            loading: false,
            error: '',
          };

          case 'PRODUCTS_SEARCH_MAN_SUCCESS':
            const manTable = new HashTable();
            
            action.payload.forEach((product) => {
              manTable.addItem(product.name);
            });
            
            return {
              ...state,
              products: action.payload,
              copyProducts: action.payload,
              productSearch: manTable,
              orders: [],
              orderHistory: [],
              totalorders: [],
              detail: [],
              loading: false,
              error: '',
            };

            case 'PRODUCTS_SEARCH_WOMAN_SUCCESS':
              const womanTable = new HashTable();
              
              action.payload.forEach((product) => {
                womanTable.addItem(product.name);
              });
              
              return {
                ...state,
                products: action.payload,
                copyProducts: action.payload,
                productSearch: searchTable,
                orders: [],
                orderHistory: [],
                totalorders: [],
                detail: [],
                loading: false,
                error: '',
              };
    



        case 'ORDER_PRODUCTS_BY_ANY_ITEM':
          let sortedArr;
          if (action.payload === 'asc_stock') {
            sortedArr = state.products.sort(function(a, b) {
              if (a.stock > b.stock) {
            return 1;
          }
          if (b.stock > a.stock) {
            return -1;
          }
        });
      } else if (action.payload === 'desc_stock') {
        sortedArr = state.products.sort(function(a, b) {
          if (a.stock > b.stock) {
            return -1;
          }
          if (b.stock > a.stock) {
            return 1;
          }
        });
      } else if (action.payload === 'asc_price') {
        sortedArr = state.products.sort(function(a, b) {
          if (parseInt(a.price) > parseInt(b.price)) {
            return 1;
          }
          if (parseInt(b.price) > parseInt(a.price)) {
            return -1;
          }
        });
      } else if (action.payload === 'desc_price') {
        sortedArr = state.products.sort(function(a, b) {
          if (parseInt(a.price) > parseInt(b.price)) {
            return -1;
          }
          if (parseInt(b.price) > parseInt(a.price)) {
            return 1;
          }
        });
      } else if (action.payload === 'asc_name') {
        sortedArr = state.products.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
        });
      } else if (action.payload === 'desc_name') {
        sortedArr = state.products.sort(function(a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
        });
      }
      return {
        ...state,
        products: sortedArr,
      };

    case 'PRODUCTS_REQUEST_DETAIL':
      return { ...state, loading: true, error: '' };

    case 'PRODUCTS_SUCCESS_DETAIL':
      return { ...state, detail: action.payload, loading: false, error: '' };

    case 'PRODUCTS_FAIL_DETAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CLEAR_PRODUCTS_STATE':
      return {
        ...state,
        products: [],
        productedit: [],
        detail: [],
        error: '',
        loading: false,
      };
    default:
      return state;
  }
};

export default productsReducer;
