import { test, expect } from "@playwright/test"
import { log } from "node:console"


test.describe("Users API", () => {

  const baseURL = "https://jsonplaceholder.typicode.com"

  test("Should get a List of Users", async ({ request }) => {
    //  Make a Get request to the API endpoint
    log(`Making a GET request to the API endpoint ${baseURL}`)
    const response = await request.get(`${baseURL}/users`)
    // Assert the response status code
    log(`Received response with status code ${response.status()}`)
    expect(response.status()).toBe(200)

    // Get List of All Users

    // Assert the response body
    const responseBody = await response.json()
    log(`Response Body: ${JSON.stringify(responseBody)}`)
    expect(Array.isArray(responseBody)).toBe(true)
    expect(responseBody.length).toBeGreaterThan(0)
    expect(responseBody[0]).toHaveProperty("id")
    expect(responseBody[0]).toHaveProperty("name")
  })
})


