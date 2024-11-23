import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost
} from "../controllers/postsController.js";

// Configura o armazenamento de arquivos para upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads (pasta "uploads/")
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  },
});

// Define a configuração do middleware multer
// Comente a linha que não se aplica ao seu sistema operacional
// Windows
const upload = multer({ dest: "./uploads", storage }); 
// Linux ou Mac
// const upload = multer({ dest: "./uploads"})

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parser JSON para processar dados enviados no formato JSON
  app.use(express.json());

  // Rota GET para listar todos os posts (implementada em postsController.js)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementada em postsController.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem e criação de post (utiliza o middleware multer)
  // O middleware "upload.single('imagem')" processa um único arquivo chamado "imagem"
  app.post("/upload", upload.single("imagem"), uploadImagem);
  
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;