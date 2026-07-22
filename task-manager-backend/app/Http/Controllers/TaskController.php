<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    // GET /api/tasks  (supports ?status=pending and ?priority=high filters)
    public function index(Request $request): JsonResponse
    {
        $query = Task::query();

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->has('priority')) {
            $query->where('priority', $request->query('priority'));
        }

        $tasks = $query->orderBy('due_date')->get();

        return response()->json($tasks, 200);
    }

    // GET /api/tasks/{id}
    public function show(Task $task): JsonResponse
    {
        return response()->json($task, 200);
    }

    // POST /api/tasks
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => ['nullable', Rule::in(['pending', 'in_progress', 'completed'])],
            'priority'    => ['nullable', Rule::in(['low', 'medium', 'high'])],
            'due_date'    => 'nullable|date',
        ]);

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    // PUT/PATCH /api/tasks/{id}
    public function update(Request $request, Task $task): JsonResponse
    {
        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status'      => ['sometimes', Rule::in(['pending', 'in_progress', 'completed'])],
            'priority'    => ['sometimes', Rule::in(['low', 'medium', 'high'])],
            'due_date'    => 'nullable|date',
        ]);

        $task->update($validated);

        return response()->json($task, 200);
    }

    // DELETE /api/tasks/{id}
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
