import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client"; // Prisma
import jwt from "jsonwebtoken";
import bodyParser from "body-parser"

const app = express();
const prisma = new PrismaClient(); // Prisma
const PORT = 8081

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const SECRET = "seu_segredo_aqui";

//const users = []; // Comentar se for usar Prisma
/*
app.use('/', (req,res) => {
    res.json({
        status: "API working fine",
        code: 200
    })
})*/

app.post('/login/google', async (req, res) => {
    const { email, name } = req.body;
  
    try {
      // Verifique se o usuário já existe
      let user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        // Cria o usuário automaticamente se não existir
        user = await prisma.user.create({
          data: { email, name, password: '' }, // Password pode ser vazio
        });
      }
  
      // Gere o token JWT para autenticação
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login com Google bem-sucedido', token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao autenticar com Google', error: error.message });
    }
  }); 

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await prisma.User.findUnique({
            where: { email: email }
        });

        if (!user) {
            console.log(`Usuário não encontrado: ${email}`);
            return res.status(406).json({ message: 'Usuário não encontrado' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login bem-sucedido', token: token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});

// **USUÁRIOS**

// Criar usuário
app.post('/users', async (req,res) => {
    //users.push(req.body);
    await prisma.user.create({ // Prisma
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    });

    res.status(201).json(req.body);
})

// Consultar apenas um usuário pelo ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
        });

        if (user) {
            // Criando as iniciais caso não tenha imagem
            const initials = user.name.split(' ').map(word => word[0]).join(' ');
            res.status(200).json({ ...user, initials });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});


// Consultar usuário
app.get('/users', async (req,res) => {
    let users = [];

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                email: req.query.email,
            }
        }); // Prisma
    } else {
        users = await prisma.user.findMany();
    }
    
    res.status(200).json(users);
});

// Editar usuário
app.put('/users/:id', async (req,res) => {
    //users.push(req.body);
    await prisma.user.update({ // Prisma
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    });

    res.status(201).json(req.body);
})

// Deletar usuário
app.delete('/users/:id', async (req,res) => {
    //users.push(req.body);
    await prisma.user.delete({ // Prisma
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({message: 'Usuário deletado com Sucesso!'});
})

// **Device**

// Criar dispositivo
app.post('/devices', async (req,res) => {
    await prisma.device.create({ // Prisma
        data: {
            name: req.body.name,
            daily: req.body.daily,
            weekly: req.body.weekly
        }
    });

    res.status(201).json(req.body);
})

// Consultar dispositivo
app.get('/devices', async (req,res) => {
    let devices = [];

    if(req.query){
        devices = await prisma.device.findMany({
            where: {
                id: req.query.id
            }
        }); // Prisma
    } else {
        devices = await prisma.device.findMany();
    }
    
    res.status(200).json(devices);
});

// Endpoint para pegar os valores `daily` dos dispositivos
app.get('/devices/daily', async (req, res) => {
    try {
        // Buscando todos os dispositivos com os campos 'name' e 'daily'
        const devices = await prisma.device.findMany({
            select: {
                name: true,
                daily: true
            }
        });

        // Retorna os dispositivos com os valores 'name' e 'daily'
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter dispositivos', error: error.message });
    }
});

// Editar dispositivo
app.put('/devices/:id', async (req,res) => {
    //users.push(req.body);
    await prisma.device.update({ // Prisma
        data: {
            name: req.body.name,
            daily: req.body.daily,
            weekly: req.body.weekly
        }
    });

    res.status(201).json(req.body);
})

// Deletar courso
app.delete('/devices/:id', async (req,res) => {
    //users.push(req.body);
    await prisma.device.delete({ // Prisma
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({message: 'Dispositivo deletado com Sucesso!'});
})


// **MATRÍCULAS**

// Criar matrícula
app.post('/dashboard', async (req,res) => {
    await prisma.dashboardId.create({ // Prisma
        data: {
            userId: req.body.userId,
            deviceId: req.body.deviceId
        }
    });

    res.status(201).json(req.body);
})

// Consultar matrícula
app.get('/dashboard', async (req,res) => {
    let dashboard = [];

    if(req.query){
        dashboard = await prisma.dashboardId.findMany({
            where: {
                userId: req.query.userId
            },
            include: {
                device: {
                    select: {
                        name: true,
                        daily: true,
                        weekly: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        }); // Prisma
    } else {
        dashboard = await prisma.dashboardId.findMany();
    }
    
    res.status(200).json(dashboard);
});

// Editar matrícula
app.put('/dashboard/:id', async (req,res) => {
    //users.push(req.body);
    await prisma.dashboardId.update({ // Prisma
        data: {
            userId: req.body.userId,
            deviceId: req.body.deviceId
        }
    });

    res.status(201).json(req.body);
})

// Deletar matrícula
app.delete('/dashboard/:id', async (req,res) => {
    //users.push(req.body);
    await prisma.dashboardId.delete({ // Prisma
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({message: 'Dashboard deletado com Sucesso!'});
})



app.listen(() => app.listen(PORT, () => console.log(`Running on port ${PORT}`)));
