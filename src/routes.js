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

                return response.writeHead(201).end(JSON.stringify(task))
            } else {
                return response.writeHead(404).end(
                    JSON.stringify({ message: 'title or description are required' })
                )
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
                return response.writeHead(204).end(
                    JSON.stringify({ message: 'task deleted' })
                )
            } else {
                return response.writeHead(404).end(
                    JSON.stringify({ message: 'task not found' })
                )
            }
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {   
            const { id } = request.params;
            const updated_at = new Date();
            const { title, description } = request.body || {};

            if (!title && !description) {
                return response.writeHead(400).end(
                    JSON.stringify({ message: 'title or description is required' })
                );
            }

            const task = database.select('tasks', { id });

            if (!task) {
                return response.writeHead(404).end(
                    JSON.stringify({ message: 'task not found' })
                );
            }

            const updatedFields = {};

            if (title) {
                updatedFields.title = title;
            }

            if (description) {
                updatedFields.description = description;
            }

            updatedFields.updated_at = updated_at;

            database.update('tasks', id, updatedFields);

            return response.writeHead(204).end(
                JSON.stringify({ message: 'task updated' })
            );
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id'),
        handler: (request, response) => {   
            const { id } = request.params;
            const completed = {};

            const [task] = database.select('tasks', { id })

            if (!task) {
                return response.writeHead(404).end(
                    JSON.stringify({ message: 'task not found' })
                )
            } 
            
            if (task.completed_at === null) {
                completed.completed_at = new Date();
            } else if (task.completed !== null) {
                completed.completed_at = null;
            }

            database.update('tasks', id, completed)

            return response.writeHead(204).end(
                JSON.stringify({ message: 'task updated' })
            )
        }
    }
]