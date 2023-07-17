const cron = require('node-cron')
const axios = require('axios')

cron.schedule('* * * * *', () => {
  console.log('Cron job running every minute')
})

// const DEV_SHOP_ID = 'edadafdf-c213-462b-910a-179c18d3a7cd'

// cron.schedule('0 9 * * *', async () => {
//   try {
//     // Fetch data from the API
//     const response = await axios.get('https://api.example.com/data')

//     // Process the data
//     if (response.status === 200) {
//       const data = response.data

//       const createdDate = new Date(data.created_at)
//       const currentDate = new Date()

//       // Calculate the difference in days
//       const diffInDays = Math.floor(
//         (currentDate - createdDate) / (1000 * 60 * 60 * 24)
//       )

//       // Check if the object is 10 days old and has an active status
//       if (diffInDays >= 10 && data.status === 'active') {
//         // Call the resolve API
//         if (data.containerId) {
//           try {
//             const resolveResponse = await axios.post(
//               `/containers/${data.containerId}/resolve`,
//               data.metaData
//             )
//             console.log(
//               `Resolve API called successfully for object: ${data.name}`
//             )

//             if (resolveResponse.status === 200) {
//               await axios.post('/containers', {
//                 devShopId: DEV_SHOP_ID,
//               })
//               console.log(
//                 `Containers API called successfully for object: ${data.name}`
//               )
//             } else {
//               console.error(
//                 `Resolve API did not return a successful status code for object: ${data.name}`
//               )
//             }
//           } catch (error) {
//             console.error(`Error calling resolve API for object: ${data.name}`)
//           }
//         } else {
//           console.warn(`No containerId available for object: ${data.name}`)
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error:', error)
//   }
// })
