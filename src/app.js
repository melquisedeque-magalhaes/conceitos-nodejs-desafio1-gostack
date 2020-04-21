const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, techs, url } = request.body

  if(!title, !techs, !url)
    response.status(400).send({ error: 'title or techs or url not found' })

  let likes = 0

  const respository = { id:uuid(), title, techs, url, likes }

  repositories.push(respository)

  return response.json(respository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, techs, url } = request.body

  const seachRepository = repositories.findIndex(repos => repos.id === id)

  if(seachRepository < 0)
    return response.status(400).json({ error: 'Repository not Found'})

  const likes = repositories[seachRepository].likes
  
  const repository = {
    id,
    title,
    techs,
    url,
    likes
  }

  const newRepository = repositories[seachRepository] = repository

  return response.json(newRepository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const seachRepository = repositories.findIndex(respos => respos.id === id)

  if(seachRepository < 0)
    return response.status(400).json({ error: 'Repository not found' })

  const del = repositories.splice(seachRepository, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const seachRepository = repositories.findIndex(repos => repos.id === id)
  
  if(seachRepository < 0)
    return response.status(400).json({ error: 'repository not found'})

  const respository = repositories[seachRepository]

  respository.likes++

  return response.json(respository)
});

module.exports = app;
