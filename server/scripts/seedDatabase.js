const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Question = require('../models/Question');
const User = require('../models/User');
const questionsData = require('./questionsData');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...\n');

    // Get or create admin user for createdBy field
    let adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      console.log('Creating admin user...');
      adminUser = await User.create({
        username: 'admin',
        email: 'admin@tracnghiem.com',
        password: '$2a$10$xQZ5Q5Z5Q5Z5Q5Z5Q5Z5Qu', // hashed "admin123"
        fullName: 'Admin User',
        settings: {
          backgroundMusic: false,
          soundEffects: false,
          timer: false,
          questionsPerExam: 5,
          examTimer: 30
        },
        stats: {
          totalExams: 0,
          totalCorrect: 0,
          totalQuestions: 0,
          averageScore: 0,
          bestScore: 0
        }
      });
      console.log('✅ Admin user created\n');
    } else {
      console.log('✅ Admin user found\n');
    }

    // Step 2: Delete existing data
    console.log('🗑️  Deleting existing subjects and questions...');
    const deletedSubjects = await Subject.deleteMany({});
    const deletedQuestions = await Question.deleteMany({});
    console.log(`   Deleted ${deletedSubjects.deletedCount} subjects`);
    console.log(`   Deleted ${deletedQuestions.deletedCount} questions\n`);

    // Step 3 & 4: Create and insert subjects
    console.log('📚 Creating subjects for CNTT...');
    const subjectsData = [
      {
        name: 'Cấu trúc dữ liệu và giải thuật',
        code: 'CTDL',
        description: 'Các cấu trúc dữ liệu cơ bản (Array, Stack, Queue, Tree, Graph) và thuật toán xử lý',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Lập trình hướng đối tượng',
        code: 'OOP',
        description: 'Các khái niệm OOP: Encapsulation, Inheritance, Polymorphism, Abstraction',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Cơ sở dữ liệu',
        code: 'CSDL',
        description: 'Thiết kế CSDL, SQL, NoSQL, MongoDB, Normalization, Transactions',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Mạng máy tính',
        code: 'MMT',
        description: 'Mô hình OSI, TCP/IP, HTTP, DNS, Routing, Switching, Network Security',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Phát triển ứng dụng Web',
        code: 'WEB',
        description: 'HTML, CSS, JavaScript, React, Node.js, RESTful API, Web Security',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Trí tuệ nhân tạo',
        code: 'AI',
        description: 'Machine Learning, Deep Learning, Neural Networks, Computer Vision, NLP',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Hệ điều hành',
        code: 'HDH',
        description: 'Process Management, Memory Management, File Systems, Linux, Windows',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'An toàn thông tin',
        code: 'ATTT',
        description: 'Cryptography, Network Security, Web Security, Ethical Hacking',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Công nghệ phần mềm',
        code: 'CNPM',
        description: 'SDLC, Agile, Scrum, Design Patterns, Testing, CI/CD',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      },
      {
        name: 'Kiến trúc máy tính',
        code: 'KTMT',
        description: 'CPU Architecture, Memory Hierarchy, I/O Systems, Assembly Language',
        isActive: true,
        createdBy: adminUser._id,
        questionCount: 0
      }
    ];

    const subjects = await Subject.insertMany(subjectsData);
    console.log(`✅ Created ${subjects.length} subjects\n`);

    // Step 5, 6, 7: Create and insert questions for each subject
    console.log('📝 Creating questions for each subject...');
    const allQuestions = [];

    // Create 25 questions for each subject (15 multiple choice + 10 true/false)
    for (const subject of subjects) {
      const subjectQuestions = questionsData[subject.code];
      
      if (subjectQuestions) {
        // Add multiple choice questions from questionsData
        subjectQuestions.multipleChoice.forEach(q => {
          allQuestions.push({
            subjectId: subject._id,
            type: 'multiple_choice',
            content: q.content,
            options: q.options,
            explanation: q.explanation,
            difficulty: q.difficulty,
            tags: q.tags,
            createdBy: adminUser._id,
            isActive: true,
            usageCount: 0,
            correctRate: 0
          });
        });

        // Add true/false questions from questionsData
        subjectQuestions.trueFalse.forEach(q => {
          allQuestions.push({
            subjectId: subject._id,
            type: 'true_false',
            content: q.content,
            options: q.options,
            explanation: q.explanation,
            difficulty: q.difficulty,
            tags: q.tags,
            createdBy: adminUser._id,
            isActive: true,
            usageCount: 0,
            correctRate: 0
          });
        });
      } else {
        // Generate default questions for subjects without pre-defined data
        // 15 multiple choice questions (4 options each)
        for (let i = 0; i < 15; i++) {
          const difficulties = ['easy', 'medium', 'hard'];
          const difficulty = difficulties[i % 3];
          
          allQuestions.push({
            subjectId: subject._id,
            type: 'multiple_choice',
            content: `Câu hỏi ${i + 1}: Kiến thức cơ bản về ${subject.name}?`,
            options: [
              { text: `Lựa chọn A - Đáp án cho ${subject.name}`, isCorrect: i % 4 === 0 },
              { text: `Lựa chọn B - Đáp án cho ${subject.name}`, isCorrect: i % 4 === 1 },
              { text: `Lựa chọn C - Đáp án cho ${subject.name}`, isCorrect: i % 4 === 2 },
              { text: `Lựa chọn D - Đáp án cho ${subject.name}`, isCorrect: i % 4 === 3 }
            ],
            explanation: `Đây là câu hỏi ${i + 1} về ${subject.name}. Giải thích chi tiết sẽ được bổ sung sau.`,
            difficulty: difficulty,
            tags: [subject.code.toLowerCase(), 'fundamental', 'practice'],
            createdBy: adminUser._id,
            isActive: true,
            usageCount: 0,
            correctRate: 0
          });
        }

        // 10 true/false questions
        for (let i = 0; i < 10; i++) {
          const difficulties = ['easy', 'medium', 'hard'];
          const difficulty = difficulties[i % 3];
          
          allQuestions.push({
            subjectId: subject._id,
            type: 'true_false',
            content: `Câu hỏi đúng/sai ${i + 1}: Nhận định về ${subject.name}`,
            options: [
              { text: 'Đúng', isCorrect: i % 2 === 0 },
              { text: 'Sai', isCorrect: i % 2 === 1 }
            ],
            explanation: `Giải thích cho câu hỏi đúng/sai ${i + 1} về ${subject.name}. Nội dung chi tiết sẽ được cập nhật.`,
            difficulty: difficulty,
            tags: [subject.code.toLowerCase(), 'true-false', 'theory'],
            createdBy: adminUser._id,
            isActive: true,
            usageCount: 0,
            correctRate: 0
          });
        }
      }
      
      console.log(`   ✅ Prepared 25 questions for ${subject.name}`);
    }

    const insertedQuestions = await Question.insertMany(allQuestions);
    console.log(`✅ Created ${insertedQuestions.length} questions\n`);

    // Step 8: Update questionCount for each subject
    console.log('🔄 Updating questionCount for subjects...');
    for (const subject of subjects) {
      const count = await Question.countDocuments({ subjectId: subject._id });
      await Subject.findByIdAndUpdate(subject._id, { questionCount: count });
    }
    console.log('✅ Updated questionCount for all subjects\n');

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
connectDB().then(() => seedDatabase());
