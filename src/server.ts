import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/user', async (req: Request, res: Response) => {
  const { posts } = req.query;
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: posts === 'true' ? true : false,
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
