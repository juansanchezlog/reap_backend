import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
    console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@') || 'Not configured');
  } catch (error) {
    console.error('Database connection failed:', error);
    console.error('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@') || 'Not configured');
    process.exit(1);
  }
}

testDatabaseConnection();

process.on('beforeExit', async () => {
  console.log('🔌Disconnecting from database...');
  await prisma.$disconnect();
});

export default prisma;
