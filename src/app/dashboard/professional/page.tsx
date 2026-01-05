
"use client";

import { useState, useMemo } from "react";
import {
  Folder,
  ChevronLeft,
  Search,
  File,
  Video,
  Link as LinkIcon,
  Columns,
  CheckSquare,
  LayoutGrid,
  Users,
  Calendar,
  Archive,
  Image as ImageIcon,
  MoreVertical,
  PlusCircle,
  Bell,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type Task = {
  id: string;
  label: string;
  completed: boolean;
  timestamp?: string;
  category: 'task' | 'file' | 'image';
  date: string;
  content?: string;
  imageUrl?: string;
};

type Message = {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
};


const initialTasks: Task[] = [
    { id: 'task1', label: 'Enviar planos al ayuntamiento', completed: false, category: 'task', date: '28 DE AGOSTO', timestamp: '10:00' },
    { id: 'task2', label: 'Memoria justificativa.doc', completed: false, category: 'file', date: '28 DE AGOSTO', timestamp: '15:00' },
    { id: 'task3', label: 'Revisar propuesta de materiales con cliente', completed: false, category: 'task', date: '29 DE AGOSTO', timestamp: '11:30' },
    { id: 'task4', label: 'Actualizar modelo 3D con cambios', completed: false, category: 'task', date: 'HOY', timestamp: '09:00' },
    { id: 'task5', label: 'Alzado de la cara norte, para que veas la distribución de los materiales.', completed: false, category: 'image', date: 'HOY', imageUrl: 'https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBob3VzZXxlbnwwfHx8fDE3Njc2NDM1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080'},
];

const initialMessages: Message[] = [
    { id: 'msg1', author: 'Cliente A', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', text: '¡Me encanta el alzado! ¿Podemos probar con un acabado de madera más oscuro en la fachada?', timestamp: 'Hace 5m' },
    { id: 'msg2', author: 'David Montoya', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', text: 'Claro, prepararé una nueva versión con esa opción. Te la comparto en breve.', timestamp: 'Hace 2m' },
];


export default function ProfessionalDashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");


  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg: Message = {
        id: `msg${messages.length + 1}`,
        author: 'David Montoya',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        text: newMessage,
        timestamp: 'Ahora',
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const completedTasks = tasks.filter(task => task.category === 'task' && task.completed).length;
  const totalTasks = tasks.filter(task => task.category === 'task').length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const groupedTasks = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const date = task.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {} as Record<string, Task[]>);
  }, [tasks]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-20 flex flex-col items-center space-y-6 py-4 bg-card border-r border-border">
        <div className="flex flex-col items-center space-y-4 flex-grow">
          <Button variant="ghost" size="icon" className="text-primary bg-primary/10">
            <LayoutGrid className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Users className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Folder className="w-6 h-6" />
          </Button>
           <Button variant="ghost" size="icon">
            <Calendar className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Archive className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex flex-col items-center space-y-4">
           <Button variant="ghost" size="icon">
            <PlusCircle className="w-6 h-6" />
          </Button>
           <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
        </div>
      </aside>

      {/* Project Navigation */}
      <nav className="w-64 bg-card p-4 border-r border-border flex flex-col">
        <div className="mb-4">
            <Button variant="ghost" size="sm" className="mb-2">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Vivienda en Barajas
            </Button>
        </div>
        <div className="space-y-2 flex-grow">
            <Button variant="secondary" className="w-full justify-start">
                <CheckSquare className="w-4 h-4 mr-2" />
                Actividad
            </Button>
            <Button variant="ghost" className="w-full justify-start">
                <Columns className="w-4 h-4 mr-2" />
                Tareas
            </Button>
            <Button variant="ghost" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Cronograma
            </Button>
            <Button variant="ghost" className="w-full justify-start">
                <Archive className="w-4 h-4 mr-2" />
                Archivos
            </Button>
            <div className="pl-8 space-y-2 pt-2">
                 <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    Bocetos
                </Button>
                 <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    Anteproyecto
                </Button>
                 <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    Fotos maqueta
                </Button>
                 <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    Moodboard
                </Button>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-9 bg-card border-border" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
               <div className="p-4">
                 <h4 className="font-medium text-sm">Notificaciones</h4>
               </div>
               <Separator />
               <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                     <Avatar className="h-8 w-8">
                       <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                       <AvatarFallback>A</AvatarFallback>
                     </Avatar>
                     <div>
                       <p className="text-sm"><b>Cliente A</b> ha comentado en <b>Alzado Norte</b>.</p>
                       <p className="text-xs text-muted-foreground">hace 5 minutos</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <Avatar className="h-8 w-8">
                       <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704e" />
                       <AvatarFallback>B</AvatarFallback>
                     </Avatar>
                     <div>
                       <p className="text-sm"><b>Cliente B</b> ha aprobado los <b>materiales</b>.</p>
                       <p className="text-xs text-muted-foreground">hace 1 hora</p>
                     </div>
                  </div>
               </div>
                <Separator />
                <div className="p-2 text-center">
                    <Button variant="link" size="sm">Ver todos los mensajes</Button>
                </div>
            </PopoverContent>
          </Popover>
        </header>

        <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
                 <h2 className="text-lg font-semibold">Progreso del Proyecto</h2>
                 <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full h-2" />
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
            {Object.entries(groupedTasks).map(([date, tasksInDate]) => (
                <div key={date}>
                    <p className="text-xs text-muted-foreground text-center mb-2">{date}</p>
                    {tasksInDate.map((task) => (
                        <Card key={task.id} className="mb-3">
                            {task.category === 'task' && (
                                <div className="p-3 flex items-center">
                                    <Checkbox
                                        id={task.id}
                                        checked={task.completed}
                                        onCheckedChange={() => toggleTask(task.id)}
                                        className="mr-3"
                                    />
                                    <label htmlFor={task.id} className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                        {task.label}
                                    </label>
                                    <span className="text-xs text-muted-foreground">{task.timestamp}</span>
                                </div>
                            )}
                             {task.category === 'file' && (
                                <div className="p-3 flex items-center">
                                    <File className="w-4 h-4 mr-3 text-muted-foreground"/>
                                    <span className="flex-1 text-sm">{task.label}</span>
                                    <span className="text-xs text-muted-foreground">{task.timestamp}</span>
                                </div>
                             )}
                             {task.category === 'image' && task.imageUrl && (
                                <div className="p-4">
                                     <div className="relative aspect-[16/9] w-full mb-3 rounded-md overflow-hidden">
                                        <Image src={task.imageUrl} layout="fill" objectFit="cover" alt={task.label}/>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{task.label}</p>
                                </div>
                             )}
                        </Card>
                    ))}
                </div>
            ))}
        </div>
      </main>

      {/* Info Panel */}
      <aside className="w-80 bg-card p-6 border-l border-border flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Info</h3>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5"/>
          </Button>
        </div>
        
        <div className="space-y-4">
            <p className="text-sm font-semibold text-muted-foreground">CLIENTES</p>
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704e" />
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-sm text-foreground/80 mb-4">
                Vivienda unifamiliar de obra nueva. Quieren 4 habitaciones, 2 baños completos, 1 baño de invitados. El terreno está en una urbanización.
            </p>
        </div>

        <Separator className="my-4"/>
        
        <div className="flex-grow space-y-4 overflow-y-auto">
             {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>{message.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                             <p className="font-semibold text-sm">{message.author}</p>
                             <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                        </div>
                        <p className="text-sm text-foreground/80">{message.text}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-auto">
            <div className="border-t border-border pt-4">
                 <div className="relative">
                    <Textarea 
                        placeholder="Escribe un mensaje..." 
                        className="bg-background border-border pr-12"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button 
                        size="icon" 
                        className="absolute right-2 bottom-2 h-8 w-8"
                        onClick={handleSendMessage}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                 </div>
                 <div className="flex items-center gap-1 mt-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><LinkIcon className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><ImageIcon className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><File className="w-4 h-4"/></Button>
                 </div>
            </div>
        </div>
      </aside>
    </div>
  );

    