import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123', 10),
    isAdmin: true,
  },
  {
    name: 'haris',
    email: 'haris@fyp.com',
    password: bcrypt.hashSync('123', 10),
  },
  {
    name: 'ali',
    email: 'ali@fyp.com',
    password: bcrypt.hashSync('123', 10),
  },
];

export default users;
