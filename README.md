# Clonando e preparando ambiente

```sh
git clone https://github.com/Tomada-Inteligente/api-dashboard # Usando Git
gh repo clone Tomada-Inteligente/api-dashboard # Usando GitHub Cli
cd api-dashboard
npm i
```

# HTTP Methods
```txt
* Get -> Listar
* Post -> Criar
* Put -> Editar vários
* Patch -> Editar um
* Delete -> Deletar
```

# HTTP Status
```txt
* 2xx -> Success
* 4xx -> Client error
* 5xx -> Server error
```

# Tipos de Requisição

## Query Params (GET)
* Consultar;
* Exemplos:
* * `servidor.com/usuarios?estado=bahia&cidade=salvador`
* * `servidor.com/series?tipo=comedia&streaming=netflix`

## Route Params (GET / PUT / DELETE)
* Buscar, deletar ou editar algo específico
* Exemplos:
* * get `servidor.com/usuarios/22`
* * put `servidor.com/usuarios/22`
* * delete `servidor.com/usuarios/22`

## Body Params (POST / PUT)
* Exemplo:



Preencha o .env de acordo com a [documentação](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-node-mongodb)
```.env
DATABASE_URL="mongodb+srv://test:test@cluster0.ns1yp.mongodb.net/myFirstDatabase
```

```sh
npx prisma db push
npx prisma studio
```

# Uso da API
## Usuários
### Criar usuário `/users`
- O usuário deve ser criado com as informações no seguinte formato:
```json
{
  "email": "rodolfo@email.com",
  "name": "Rodolfo Santos",
  "password": "123456"
}
```

### Consultar usuário `/users`
- Pode ser usado Query Params (procurando pelo email):
```
/users?email=rodolfo@email.com
```

### Editar usuário `/users/:id`
- Deve usar as informações no mesmo formato da criação do usuário, mas com a rota apontando para o id do usuário

### Deletar usuário `/users/:id`
- Deve ter a rota apontando para o id do usuário

## Dispostivos
### Criar dispositivo `/devices`
- O curso deve ser criado com as informações seguindo o seguinte formato:
```json
{
  "name": "Geladeira",
  "daily": "3",
  "weekly": "21"
}
```

### Consultar dispostivo `/devices`
- Pode ser usado Query Params (procurando pelo id):
```
/devices?id=...
```

### Editar dispositivos `/devices/:id`
- Deve usar as informações no mesmo formato da criação do dispositivos, mas com a rota apontando para o id do dispositivo

### Deletar dispositivo `/devices/:id`
- Deve ter a rota apontando para o id do dispositivo

## Dashboard
### Criar dispositivo `/dashboard`
- A dashboard deve ser criada com as informações seguindo o seguinte formato:
```json
{
  "userId": "id-do-usuario",
  "deviceId": "id-do-dispositivo"
}
```

### Consultar curso `/dashboard`
- Pode ser usado Query Params (procurando pelo id):
```
/dashboard?id=...
```

### Editar dispositivos `/dashboard/:id`
- Deve usar as informações no mesmo formato da criação da dashboard, mas com a rota apontando para o id da dashboard

### Deletar curso `/dashboard/:id`
- Deve ter a rota apontando para o id da dashboard
