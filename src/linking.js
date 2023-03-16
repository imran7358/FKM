// const config = {
//     screens : {
//         Coupons : "coupons",
//         Store:"store",
     

//      Details : {
//         path :"deals/:dealSlug",
//         parse : {
//             dealSlug: (dealSlug) => `${dealSlug}`,
//         },
//      },
//     },
// }
// const linking = {
//     prefixes: ['fkm://'],
//     config,
// };
const linking = {
    prefixes: [ 'fkmapp://'],
    config: {
      screens: {
        AllStores: 'store',
          
        },
      },
    };
export default linking;