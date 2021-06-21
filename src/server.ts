import express from 'express'


const app = express()

app.listen(3000, () => console.log('Server is running...'))


app.get("/test", (request, response) => {
    return response.send("Olà, NLW (:")
})

app.post("/test", (request, response) => {
    return response.send("Olá, NLW (: :: POST!")
})