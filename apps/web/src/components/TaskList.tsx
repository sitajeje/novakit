// apps/web/src/components/TaskList.tsx
"use client";

import { useEffect, useState } from "react";
import { useProjectsStore, Task } from "@novakit/core";
import { Button, Input, Card, CardHeader, CardContent } from "@novakit/ui";
import { CheckCircle2, Circle, Trash2, Plus, Info, Edit2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TaskList({ projectId }: { projectId: string }) {
    const { tasks, fetchTasks, addTask, toggleTask, deleteTask, updateTask } = useProjectsStore();
    const [newTask, setNewTask] = useState("");
    const [note, setNote] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        if (projectId) fetchTasks(projectId);
    }, [projectId]);

    const handleAdd = async () => {
        if (!newTask.trim()) return;
        await addTask(projectId, newTask, note);
        setNewTask("");
        setNote("");
    };

    return (
        <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-lg rounded-2xl p-4 text-white">
            <CardHeader>
                <h2 className="text-lg font-semibold tracking-wide text-slate-200">
                Project Tasks
                </h2>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex gap-2">
                <Input
                    placeholder="Add new task..."
                    value={newTask}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
                    className="flex-1 bg-slate-800 border-slate-600 text-white focus:ring-2 focus:ring-indigo-500"
                />
                <Button
                    onClick={handleAdd}
                    className="bg-indigo-600 hover:bg-indigo-500 transition rounded-xl"
                >
                    <Plus className="w-4 h-4" />
                </Button>
                </div>

                <AnimatePresence>
                    {tasks.length === 0 && (
                        <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-500 italic"
                        >
                        No tasks yet.
                        </motion.p>
                    )}

                    {tasks.map((t: Task) => (
                        <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="group flex justify-between items-center p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
                        >
                        <div className="flex items-center gap-3 cursor-pointer">
                            <input
                            type="radio"
                            checked={t.is_done}
                            onChange={() => toggleTask(t.id, !t.is_done)}
                            className="accent-indigo-500 cursor-pointer"
                            />
                            {editingId === t.id ? (
                            <input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="bg-transparent border-b border-slate-500 focus:outline-none text-slate-200 text-sm"
                                onBlur={() => {
                                updateTask(t.id, editValue, t.note);
                                setEditingId(null);
                                }}
                                autoFocus
                            />
                            ) : (
                            <span
                                className={`text-sm ${
                                t.is_done ? "line-through text-gray-500" : "text-slate-200"
                                }`}
                                onDoubleClick={() => {
                                setEditingId(t.id);
                                setEditValue(t.name);
                                }}
                            >
                                {t.name}
                            </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {t.note && (
                            <div className="relative group/tooltip">
                                <Info className="text-slate-400 w-4 h-4" />
                                <div className="absolute hidden group-hover/tooltip:block bg-slate-700 text-xs text-white p-2 rounded-lg top-6 right-0 w-40 shadow-lg">
                                {t.note}
                                </div>
                            </div>
                            )}
                            {editingId === t.id ? (
                            <X
                                className="text-slate-400 cursor-pointer"
                                onClick={() => setEditingId(null)}
                            />
                            ) : (
                            <Edit2
                                className="text-slate-400 cursor-pointer hover:text-indigo-400"
                                onClick={() => {
                                setEditingId(t.id);
                                setEditValue(t.name);
                                }}
                            />
                            )}
                            <Trash2
                            onClick={() => deleteTask(t.id)}
                            className="text-red-500 hover:text-red-400 cursor-pointer transition"
                            />
                        </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
