const cron = require('node-cron')
const axios = require('axios')

// cron.schedule('0 */3 * * *', () => {
//   const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false })
//   console.log(`Cron job running every 3 hours. Current time: ${currentTime}`)
// })

const API_URL =
  'https://2amhjh2kla.execute-api.us-west-1.amazonaws.com/prod/backend'
const SECRET_KEY = '25599550-2686-4879-b83c-ee5ce88cff00'

cron.schedule('* * * * *', async () => {
  try {
    const response = await axios.post(API_URL, {
      type: 'current_escrow_timestamp',
      secret_key: SECRET_KEY,
    })

    // Process the data
    if (response.status === 200) {
      const data = response.data

      const createdDate = new Date(data.body.created_on * 1000)
      const currentDate = new Date()

      // Calculate the difference in days
      const diffInDays = Math.floor(
        (currentDate - createdDate) / (1000 * 60 * 60 * 24)
      )

      console.log('response', createdDate, currentDate, diffInDays)
      // Check if the object is 10 days old and has an active status
      if (diffInDays >= 0) {
        // Call the resolve API
        try {
          const resolveResponse = await axios.post(API_URL, {
            type: 'resolve_escrow',
            secret_key: SECRET_KEY,
          })

          console.log('=== resolve_escrow API called successfully ===')
          if (resolveResponse.status === 200) {
            await axios.post(API_URL, {
              type: 'create_escrow',
              secret_key: SECRET_KEY,
            })
            console.log('=== create_escrow API called successfully ===')
          } else {
            console.error(
              '=== resolve_escrow API did not return a successful status code ==='
            )
          }
        } catch (error) {
          console.error('=== Error calling resolve_escrow API ===')
        }
      }
    }
  } catch (error) {
    console.error('Error:', error)
  }
})
