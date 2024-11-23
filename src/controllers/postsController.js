import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";

// Importa as funções para obter todos os posts e criar um novo post do módulo postsModel.js
// Importa o módulo fs para realizar operações com o sistema de arquivos

export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados utilizando a função getTodosPosts()
  const posts = await getTodosPosts();

  // Envia os posts como resposta em formato JSON com o código de status 200 (sucesso)
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;

  // Tenta criar o novo post utilizando a função criarPost()
  try {
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com o código de status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga a mensagem de erro no console e envia uma resposta com o código de status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original do arquivo da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  // Tenta criar o novo post e renomear o arquivo da imagem
  try {
    // Cria o novo post no banco de dados
    const postCriado = await criarPost(novoPost);

    // Gera o novo nome do arquivo da imagem com base no ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia o post criado como resposta em formato JSON com o código de status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, loga a mensagem de erro no console e envia uma resposta com o código de status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}