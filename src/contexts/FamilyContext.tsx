import React, { createContext, useContext, useState, useEffect } from "react";
import { format } from "date-fns";

// Types
export type ProfileType = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  role: "parent" | "child" | "caregiver";
};

export type EventType = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  profileId: string;
  location?: string;
  description?: string;
  recurring?: string;
};

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  assignedTo: string;
  createdBy: string;
  points?: number;
  recurring?: string;
};

export type MessageType = {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  isAnnouncement: boolean;
  isHandwritten?: boolean;
};

export type PollType = {
  id: string;
  question: string;
  options: PollOptionType[];
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
};

export type PollOptionType = {
  id: string;
  text: string;
  votes: string[]; // Array of profileIds who voted for this option
};

type FamilyContextType = {
  profiles: ProfileType[];
  events: EventType[];
  tasks: TaskType[];
  messages: MessageType[];
  polls: PollType[];
  activeProfile: ProfileType | null;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addProfile: (profile: Omit<ProfileType, "id">) => void;
  setActiveProfile: (profile: ProfileType) => void;
  addEvent: (event: Omit<EventType, "id">) => void;
  updateEvent: (id: string, event: Partial<EventType>) => void;
  deleteEvent: (id: string) => void;
  addTask: (task: Omit<TaskType, "id">) => void;
  updateTask: (id: string, task: Partial<TaskType>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addMessage: (message: Omit<MessageType, "id" | "timestamp">) => void;
  deleteMessage: (id: string) => void;
  addPoll: (poll: Omit<PollType, "id" | "createdAt" | "isActive">) => void;
  votePoll: (pollId: string, optionId: string, profileId: string) => void;
  closePoll: (pollId: string) => void;
};

// Sample data
const SAMPLE_PROFILES: ProfileType[] = [
  {
    id: "1",
    name: "Mom",
    avatar: "👩",
    color: "family-blue",
    role: "parent",
  },
  {
    id: "2",
    name: "Dad",
    avatar: "👨",
    color: "family-green",
    role: "parent",
  },
  {
    id: "3",
    name: "Sarah",
    avatar: "👧",
    color: "family-purple",
    role: "child",
  },
  {
    id: "4",
    name: "Jack",
    avatar: "👦",
    color: "family-orange",
    role: "child",
  },
];

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const SAMPLE_EVENTS: EventType[] = [
  {
    id: "1",
    title: "Soccer Practice",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 30),
    allDay: false,
    profileId: "3",
    location: "City Sports Complex",
  },
  {
    id: "2",
    title: "Dentist Appointment",
    start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0),
    end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 11, 0),
    allDay: false,
    profileId: "4",
    location: "Dr. Smith's Office",
  },
  {
    id: "3",
    title: "Family Dinner",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 30),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
    allDay: false,
    profileId: "1",
    location: "Home",
  },
];

const SAMPLE_TASKS: TaskType[] = [
  {
    id: "1",
    title: "Take out the trash",
    description: "Don't forget the recycling too!",
    dueDate: today,
    completed: false,
    assignedTo: "4",
    createdBy: "1",
    points: 5,
  },
  {
    id: "2",
    title: "Homework",
    description: "Math and Science",
    dueDate: tomorrow,
    completed: false,
    assignedTo: "3",
    createdBy: "2",
    points: 10,
  },
  {
    id: "3",
    title: "Clean bedroom",
    dueDate: today,
    completed: true,
    assignedTo: "3",
    createdBy: "1",
    points: 15,
  },
];

const SAMPLE_MESSAGES: MessageType[] = [
  {
    id: "1",
    content: "I'll pick up the kids from school today",
    senderId: "2",
    timestamp: new Date(today.getTime() - 3600000),
    isAnnouncement: false,
  },
  {
    id: "2",
    content: "Pizza night this Friday! 🍕",
    senderId: "1",
    timestamp: new Date(today.getTime() - 7200000),
    isAnnouncement: true,
  },
];

const SAMPLE_POLLS: PollType[] = [
  {
    id: "1",
    question: "What should we have for dinner Friday?",
    options: [
      { id: "opt1", text: "Pizza", votes: ["1"] },
      { id: "opt2", text: "Tacos", votes: ["3"] },
      { id: "opt3", text: "Burgers", votes: ["4"] },
      { id: "opt4", text: "Pasta", votes: ["2"] },
    ],
    createdBy: "1",
    createdAt: new Date(today.getTime() - 12600000),
    expiresAt: new Date(today.getTime() + 86400000),
    isActive: true,
  },
  {
    id: "2",
    question: "Where should we go this weekend?",
    options: [
      { id: "opt1", text: "Beach", votes: ["3", "4"] },
      { id: "opt2", text: "Movies", votes: ["1"] },
      { id: "opt3", text: "Park", votes: ["2"] },
    ],
    createdBy: "2",
    createdAt: new Date(today.getTime() - 172800000),
    expiresAt: new Date(today.getTime() + 43200000),
    isActive: true,
  },
];

// Create context
const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<ProfileType[]>(SAMPLE_PROFILES);
  const [events, setEvents] = useState<EventType[]>(SAMPLE_EVENTS);
  const [tasks, setTasks] = useState<TaskType[]>(SAMPLE_TASKS);
  const [messages, setMessages] = useState<MessageType[]>(SAMPLE_MESSAGES);
  const [polls, setPolls] = useState<PollType[]>(SAMPLE_POLLS);
  const [activeProfile, setActiveProfile] = useState<ProfileType | null>(SAMPLE_PROFILES[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Event handlers
  const addProfile = (profile: Omit<ProfileType, "id">) => {
    const newProfile = {
      ...profile,
      id: Date.now().toString(),
    };
    setProfiles([...profiles, newProfile]);
  };

  const addEvent = (event: Omit<EventType, "id">) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, eventData: Partial<EventType>) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, ...eventData } : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const addTask = (task: Omit<TaskType, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, taskData: Partial<TaskType>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...taskData } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addMessage = (message: Omit<MessageType, "id" | "timestamp">) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages([newMessage, ...messages]);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const addPoll = (poll: Omit<PollType, "id" | "createdAt" | "isActive">) => {
    const newPoll = {
      ...poll,
      id: Date.now().toString(),
      createdAt: new Date(),
      isActive: true,
    };
    setPolls([newPoll, ...polls]);
  };

  const votePoll = (pollId: string, optionId: string, profileId: string) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            if (option.id === optionId) {
              // Remove vote from this profile if it exists on any other option
              const updatedOptions = poll.options.map((opt) => ({
                ...opt,
                votes: opt.votes.filter((id) => id !== profileId),
              }));
              
              // Add vote to this option
              return {
                ...option,
                votes: [...option.votes, profileId],
              };
            }
            return option;
          });
          
          return { ...poll, options: updatedOptions };
        }
        return poll;
      })
    );
  };

  const closePoll = (pollId: string) => {
    setPolls(
      polls.map((poll) =>
        poll.id === pollId ? { ...poll, isActive: false } : poll
      )
    );
  };

  // For debugging
  useEffect(() => {
    console.log("Family Context Updated:", {
      profiles,
      events,
      tasks,
      messages,
      polls,
      activeProfile,
      selectedDate: format(selectedDate, "yyyy-MM-dd"),
    });
  }, [profiles, events, tasks, messages, polls, activeProfile, selectedDate]);

  return (
    <FamilyContext.Provider
      value={{
        profiles,
        events,
        tasks,
        messages,
        polls,
        activeProfile,
        selectedDate,
        setSelectedDate,
        addProfile,
        setActiveProfile,
        addEvent,
        updateEvent,
        deleteEvent,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addMessage,
        deleteMessage,
        addPoll,
        votePoll,
        closePoll,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (context === undefined) {
    throw new Error("useFamily must be used within a FamilyProvider");
  }
  return context;
};
