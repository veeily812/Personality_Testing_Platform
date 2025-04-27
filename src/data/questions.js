// src/data/questions.js

export const hollandQuestions = [
  {
    question: "You’re planning your weekend. Which plan sounds most exciting?",
    options: [
      { label: "Fixing something at home", value: "R", contribute: { R: 1 } },
      { label: "Trying a science experiment", value: "I", contribute: { I: 1 } },
      { label: "Painting, writing, or making music", value: "A", contribute: { A: 1 } },
      { label: "Volunteering at a local event", value: "S", contribute: { S: 1 } },
      { label: "Pitching a new business idea", value: "E", contribute: { E: 1 } },
      { label: "Organizing your files", value: "C", contribute: { C: 1 } },
    ],
  },
  {
    question: "You’re given a big school/work project. What's your first instinct?",
    options: [
      { label: "Build a prototype", value: "R", contribute: { R: 1 } },
      { label: "Research deeply", value: "I", contribute: { I: 1 } },
      { label: "Design a visual presentation", value: "A", contribute: { A: 1 } },
      { label: "Help new members understand their tasks", value: "S", contribute: { S: 1 } },
      { label: "Lead and pitch ideas", value: "E", contribute: { E: 1 } },
      { label: "Create detailed plans", value: "C", contribute: { C: 1 } },
    ],
  },
  {
    question: "You receive an unexpected free afternoon. You would rather:",
    options: [
      { label: "Fix something broken", value: "R", contribute: { R: 1 } },
      { label: "Read a science book", value: "I", contribute: { I: 1 } },
      { label: "Create a new artwork", value: "A", contribute: { A: 1 } },
      { label: "Volunteer or help a friend", value: "S", contribute: { S: 1 } },
      { label: "Pitch a small business idea", value: "E", contribute: { E: 1 } },
      { label: "Organize your closet", value: "C", contribute: { C: 1 } },
    ],
  },
  {
    question: "Which type of task do you naturally enjoy more?",
    options: [
      { label: "Physical, hands-on work", value: "R", contribute: { R: 1 } },
      { label: "Complex problem-solving", value: "I", contribute: { I: 1 } },
      { label: "Creative projects", value: "A", contribute: { A: 1 } },
      { label: "Helping others with advice", value: "S", contribute: { S: 1 } },
      { label: "Persuading and negotiating", value: "E", contribute: { E: 1 } },
      { label: "Following established procedures", value: "C", contribute: { C: 1 } },
    ],
  },
  {
    question: "If you could magically master one skill, it would be:",
    options: [
      { label: "Building anything", value: "R", contribute: { R: 1 } },
      { label: "Solving mysteries and puzzles", value: "I", contribute: { I: 1 } },
      { label: "Painting or composing music", value: "A", contribute: { A: 1 } },
      { label: "Motivating and coaching people", value: "S", contribute: { S: 1 } },
      { label: "Leading a global movement", value: "E", contribute: { E: 1 } },
      { label: "Running large operations smoothly", value: "C", contribute: { C: 1 } },
    ],
  },
  {
    question: "You feel most satisfied when you:",
    options: [
      { label: "Complete a DIY project", value: "R", contribute: { R: 1 } },
      { label: "Solve a tough problem no one else could", value: "I", contribute: { I: 1 } },
      { label: "Express yourself creatively", value: "A", contribute: { A: 1 } },
      { label: "Help someone achieve their goals", value: "S", contribute: { S: 1 } },
      { label: "Lead a successful team effort", value: "E", contribute: { E: 1 } },
      { label: "Organize and finish all tasks efficiently", value: "C", contribute: { C: 1 } },
    ],
  },
  {
    question: "You get most excited by:",
    options: [
      { label: "Hands-on construction", value: "R", contribute: { R: 1 } },
      { label: "Scientific discoveries", value: "I", contribute: { I: 1 } },
      { label: "Artistic exhibitions", value: "A", contribute: { A: 1 } },
      { label: "Community volunteering", value: "S", contribute: { S: 1 } },
      { label: "Business networking events", value: "E", contribute: { E: 1 } },
      { label: "Financial planning workshops", value: "C", contribute: { C: 1 } },
    ],
  },
  {
    question: "You tend to prefer activities that are:",
    options: [
      { label: "Tangible and visible", value: "R", contribute: { R: 1 } },
      { label: "Intellectual and logical", value: "I", contribute: { I: 1 } },
      { label: "Creative and imaginative", value: "A", contribute: { A: 1 } },
      { label: "Socially impactful", value: "S", contribute: { S: 1 } },
      { label: "Persuasive and leading", value: "E", contribute: { E: 1 } },
      { label: "Systematic and structured", value: "C", contribute: { C: 1 } },
    ],
  },
];

export const mbtiQuestions = [
  {
    question: "After a tiring day, what sounds most refreshing?",
    options: [
      { label: "Going out with friends", value: "E", contribute: { E: 1 } },
      { label: "Staying home with a book", value: "I", contribute: { I: 1 } },
    ],
  },
  {
    question: "When solving a tricky problem, you usually:",
    options: [
      { label: "Trust facts and examples", value: "S", contribute: { S: 1 } },
      { label: "Trust patterns and gut feeling", value: "N", contribute: { N: 1 } },
    ],
  },
  {
    question: "When planning a trip, you prefer:",
    options: [
      { label: "Have a detailed plan", value: "J", contribute: { J: 1 } },
      { label: "Go with the flow", value: "P", contribute: { P: 1 } },
    ],
  },
  {
    question: "When your friend asks for advice, you usually:",
    options: [
      { label: "Give logical suggestions", value: "T", contribute: { T: 1 } },
      { label: "Focus on emotions", value: "F", contribute: { F: 1 } },
    ],
  },
  {
    question: "At a party, you are more likely to:",
    options: [
      { label: "Start conversations", value: "E", contribute: { E: 1 } },
      { label: "Stay close to familiar faces", value: "I", contribute: { I: 1 } },
    ],
  },
  {
    question: "When learning something new, you prefer:",
    options: [
      { label: "Hands-on practice", value: "S", contribute: { S: 1 } },
      { label: "Abstract theories", value: "N", contribute: { N: 1 } },
    ],
  },
  {
    question: "Deadlines make you feel:",
    options: [
      { label: "Motivated and focused", value: "J", contribute: { J: 1 } },
      { label: "Craving more flexibility", value: "P", contribute: { P: 1 } },
    ],
  },
  {
    question: "In a discussion, you are more likely to:",
    options: [
      { label: "Stick to facts", value: "S", contribute: { S: 1 } },
      { label: "Explore possibilities", value: "N", contribute: { N: 1 } },
    ],
  },
  {
    question: "When making decisions, you:",
    options: [
      { label: "Use logic and fairness", value: "T", contribute: { T: 1 } },
      { label: "Consider how people feel", value: "F", contribute: { F: 1 } },
    ],
  },
  {
    question: "Your workspace is usually:",
    options: [
      { label: "Neat and organized", value: "J", contribute: { J: 1 } },
      { label: "Casual and adaptable", value: "P", contribute: { P: 1 } },
    ],
  },
];
