"use client"

import dotenv from "dotenv"
import connectDB from "../config/database.js"
import User from "../models/User.js"
import Question from "../models/Question.js"
import Answer from "../models/Answer.js"
import Challenge from "../models/Challenge.js"

dotenv.config()

const seedData = async () => {
  try {
    await connectDB()

    // Clear existing data
    await User.deleteMany({})
    await Question.deleteMany({})
    await Answer.deleteMany({})
    await Challenge.deleteMany({})

    console.log("🗑️  Cleared existing data")

    // Create users
    const users = await User.create([
      {
        username: "john_dev",
        email: "john@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Developer",
        bio: "Full-stack developer with 5 years of experience",
        skills: ["JavaScript", "React", "Node.js", "MongoDB"],
        role: "user",
        reputation: 150,
      },
      {
        username: "jane_coder",
        email: "jane@example.com",
        password: "password123",
        firstName: "Jane",
        lastName: "Coder",
        bio: "Python enthusiast and data science lover",
        skills: ["Python", "Django", "Machine Learning", "PostgreSQL"],
        role: "moderator",
        reputation: 280,
      },
      {
        username: "admin_user",
        email: "admin@example.com",
        password: "password123",
        firstName: "Admin",
        lastName: "User",
        bio: "Platform administrator",
        skills: ["System Administration", "DevOps", "Security"],
        role: "admin",
        reputation: 500,
      },
    ])

    console.log("👥 Created users")

    // Create questions
    const questions = await Question.create([
      {
        title: "How to handle async/await in JavaScript?",
        content:
          "I'm having trouble understanding how async/await works in JavaScript. Can someone explain with examples?",
        author: users[0]._id,
        category: "javascript",
        difficulty: "beginner",
        tags: ["javascript", "async", "promises"],
        codeSnippet: `async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
        language: "javascript",
      },
      {
        title: "Best practices for React component optimization",
        content: "What are the best practices for optimizing React components for better performance?",
        author: users[1]._id,
        category: "react",
        difficulty: "intermediate",
        tags: ["react", "performance", "optimization"],
        views: 45,
      },
      {
        title: "MongoDB aggregation pipeline explained",
        content: "Can someone explain how MongoDB aggregation pipeline works with practical examples?",
        author: users[0]._id,
        category: "mongodb",
        difficulty: "advanced",
        tags: ["mongodb", "aggregation", "database"],
        views: 23,
      },
    ])

    console.log("❓ Created questions")

    // Create answers
    const answers = await Answer.create([
      {
        content: "Async/await is syntactic sugar over Promises. Here's how it works...",
        author: users[1]._id,
        question: questions[0]._id,
        codeSnippet: `// Promise-based approach
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/await approach
async function getData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}`,
        language: "javascript",
      },
      {
        content: "For React optimization, consider using React.memo, useMemo, and useCallback...",
        author: users[2]._id,
        question: questions[1]._id,
        codeSnippet: `import React, { memo, useMemo, useCallback } from 'react';

const OptimizedComponent = memo(({ items, onItemClick }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      {items.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
});`,
        language: "javascript",
      },
    ])

    console.log("💬 Created answers")

    // Create challenges
    const challenges = await Challenge.create([
      {
        title: "Two Sum Problem",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        author: users[2]._id,
        difficulty: "easy",
        category: "algorithms",
        tags: ["array", "hash-table"],
        constraints: "Only one valid answer exists.",
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
          },
        ],
        testCases: [
          {
            input: "[2,7,11,15], 9",
            expectedOutput: "[0,1]",
            isHidden: false,
          },
          {
            input: "[3,2,4], 6",
            expectedOutput: "[1,2]",
            isHidden: true,
          },
        ],
        starterCode: {
          javascript: `function twoSum(nums, target) {
    // Your code here
}`,
          python: `def two_sum(nums, target):
    # Your code here
    pass`,
        },
        isPublished: true,
        publishedAt: new Date(),
      },
    ])

    console.log("🏆 Created challenges")

    console.log("✅ Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

seedData()
