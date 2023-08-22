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

            if (title && description) {
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
            } else {
                return response.writeHead(404).end("No title or description.")
            }
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {
            const { id } = request.params

            const [task] = database.select('tasks', { id })

            if (task) {
                database.delete('tasks', id)
                return response.writeHead(204).end("Task deleted.")
            } else {
                return response.writeHead(404).end("Task not found.")
            }
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {   
            const { id } = request.params
            const updated_at = new Date()

            const [task] = database.select('tasks', { id })

            if (task) {
                if (request.body) { 
                    const { title, description } = request.body

                    if (title && description) {
                        database.update('tasks', id, {
                            title,
                            description,
                            updated_at
                        })
                    } else if (!title && description) {
                        database.update('tasks', id, {
                            description,
                            updated_at
                        })
                    } else if (title && !description) {
                        database.update('tasks', id, {
                            title,
                            updated_at
                        })
                    } else {
                        return response.writeHead(400).end("Title or description are required.")
                    }
                
                    return response.writeHead(204).end()

                } else {
                    return response.writeHead(400).end("Title or description are required.")
                }
            } else {
                return response.writeHead(404).end("Task not found.")
            }
        }
    }
]