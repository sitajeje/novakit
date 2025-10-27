//apps/web/src/components/ProjectTable.tsx
'use client';
import { useEffect, useMemo, useState } from "react";
import { useProjectsStore } from "@novakit/core";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Card, CardHeader, CardContent, CardTitle, Button, Input } from "@novakit/ui";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type Props = { projectId: string };

export function ProjectTable({ projectId }: Props) {
    const { tasks, fetchTasks, addTask, updateTask, deleteTask, toggleTask, fetchMembers } = useProjectsStore();
    const [newTask, setNewTask] = useState("");
    const [note, setNote] = useState("");
    const [showMembers, setShowMembers] = useState(false);
    const [members, setMembers] = useState<Array<{ id: string; name: string; role: string }>>([]);
    useEffect(() => {
        if (projectId) fetchTasks(projectId);
    }, [projectId]);
    useEffect(() => {
        if (showMembers && projectId) {
        fetchMembers(projectId).then(setMembers);
        }
    }, [showMembers, projectId, fetchMembers]);
    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "status",
                header: "✔",
                cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.original.status}
                    onChange={() => toggleTask(row.original.id, row.original.status)}
                    className="accent-cyan-500 cursor-pointer"
                />
                ),
            },
            {
                accessorKey: "name",
                header: "Task",
                cell: ({ row }) => (
                <span
                    title={row.original.note || ""}
                    className={`${
                    row.original.status ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                >
                    {row.original.name}
                </span>
                ),
            },
            {
                accessorKey: "created_by",
                header: "Created By",
                cell: ({ row }) => (
                    <span className="text-xs text-gray-500">
                        {row.original.creator_name || "Unknown"}
                    </span>
                ),
            },
            {
                accessorKey: "created_at",
                header: "Created",
                cell: ({ row }) => (
                <span className="text-xs text-gray-500">
                    {new Date(row.original.created_at).toLocaleDateString()}
                </span>
                ),
            },
            {
                id: "actions",
                header: "⋮",
                cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                        const newTitle = prompt("Edit task title:", row.original.name);
                        const newNote = prompt("Edit note:", row.original.note || "");
                        if (newTitle !== null) updateTask(row.original.id, newTitle, newNote || "");
                    }}
                    >
                    ✏️
                    </Button>
                    <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTask(row.original.id)}
                    >
                    🗑
                    </Button>
                </div>
                ),
            },
        ],
        [toggleTask, updateTask, deleteTask]
    );

    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const handleAdd = () => {
        if (!newTask.trim()) return;
        addTask(projectId, newTask, note);
        setNewTask("");
        setNote("");
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
        <Card className="p-6 mt-6 backdrop-blur-xl bg-white/80 shadow-xl border border-cyan-100 rounded-2xl">
            <CardHeader className="flex justify-between items-center mb-3">
            <CardTitle className="text-lg font-semibold text-gray-800">
                Project Tasks
            </CardTitle>
            <Button
                size="sm"
                className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                onClick={() => setShowMembers(!showMembers)} // ✅ toggle 显示
                >
                👥 {showMembers ? "Hide Members" : "Members"}
            </Button>
            <div className="flex gap-2">
                <Input
                placeholder="New task..."
                value={newTask}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
                className="px-2 py-1 border border-cyan-300 rounded-lg text-sm"
                />
                <Input
                placeholder="Note (optional)"
                value={note}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
                className="px-2 py-1 border border-cyan-300 rounded-lg text-sm"
                />
                <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 rounded-lg"
                onClick={handleAdd}
                >
                + Add
                </Button>
            </div>
            </CardHeader>

            <CardContent>
            <table className="w-full border-collapse">
                <thead className="bg-cyan-50">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                        key={header.id}
                        className="border-b py-2 text-left font-semibold text-gray-700"
                        >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr
                    key={row.id}
                    className="hover:bg-cyan-50/60 transition-colors"
                    >
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-2 border-b text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </CardContent>
            {showMembers && (
                <div className="mt-4 p-4 border border-cyan-100 rounded-lg bg-cyan-50/60">
                <h3 className="font-semibold text-gray-700 mb-2">👥 Project Members</h3>
                <ul className="text-sm text-gray-600">
                    {members.length === 0 && <li className="italic text-gray-400">No members found.</li>}
                    {members.map((m) => (
                    <li key={m.id} className="py-1 flex justify-between border-b last:border-0">
                        <span>{m.name}</span>
                        <span className="text-gray-400 italic">{m.role}</span>
                    </li>
                    ))}
                </ul>
                </div>
            )}

        </Card>
        </motion.div>
    );
}