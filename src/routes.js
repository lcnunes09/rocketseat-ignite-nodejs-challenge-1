import { Database } from './database.js'

import { randomUUID } from 'node:crypto'

import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (request, response) => {
            const { search } = request.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

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
                created_at: new Date(),
                updated_at: null,
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

            if (database.delete('tasks', id) === true) {
                return response.writeHead(204).end()
            } else {
                return response.writeHead(404).end("Task not found")
            }
        }
    }
]