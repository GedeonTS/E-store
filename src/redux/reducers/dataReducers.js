import { GET_DATA } from '../actionsType';

const initialialize = { data: {} };

const dataReducer = (state = initialialize, action = { type: '' }) => {
  switch (action.type) {
    case GET_DATA: {
      const home = { data: action.payload };
      let data = {};
      let row = {};
      const all = [];
      const clothes = [];
      const tech = [];
      home.data.data.categories.forEach((category) => {
        category.products.forEach((element) => {
          const cart = [];
          action.cartArr.forEach((order) => {
            if (order.id === element.id) {
              cart.push(order);
            }
          });
          row = element;
          if (cart.length <= 0) {
            row = { ...row, addedToCart: false };
          } else {
            row = { ...row, addedToCart: true };
          }

          element = { ...row };
          if (category.name === 'clothes') {
            clothes.push(element);
          } else if (category.name === 'tech') {
            tech.push(element);
          } else if (category.name === 'all') {
            all.push(element);
          }
        });
      });
      data = {
        data: {
          categories: [
            { name: 'all', products: all },
            { name: 'clothes', products: clothes },
            { name: 'tech', products: tech }],
        },
      };
      return { data };
    } default:
      return state;
  }
};

export default dataReducer;
