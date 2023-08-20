import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

import { randomUUID } from 'node:crypto'

const database = new Database

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    if (method === 'GET' && url === '/tasks') {
        const tasks = database.select('tasks')

        return response.end(JSON.stringify(tasks))
    }

    if (method === 'POST' && url === '/tasks') {
        const { title, description } = request.body

        const task = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
        }

        database.insert('tasks', task)

        return response.writeHead(201).end()
    }

    return response.writeHead(404).end()
})

server.listen(3334)