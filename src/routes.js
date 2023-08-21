import { Database } from './database.js'

import { randomUUID } from 'node:crypto'

import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const tasks = database.select('tasks')

            return response.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
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
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params

            database.delete('tasks', id)

            return response.writeHead(204).end()
        }
    }
]