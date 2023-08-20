import { Database } from './database.js'

import { randomUUID } from 'node:crypto'

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, response) => {
            const tasks = database.select('tasks')

            return response.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
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
    }
]