const Sequelize = require('sequelize');
 
const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const Op = Sequelize.Op;


const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail:async (req, res) => {
    //Punto 1: Renderizar detalles
    let book = await db.Book.findByPk(req.params.id,{include:[{association:"authors"}]});
    let authors = await db.Author.findByPk(req.params.id)
    return res.render('bookDetail', { book: book, authors: authors})
},
  bookSearch: async(req, res) => {
    res.render("search", { books: []});
  },
  bookSearchResult: (req, res) => {
    //Punto 2: Búsqueda por título
    db.Book.findAll({
      where: {
        title: {[Op.like]: `%${req.body.title}%`}
    },
    include: [{ association: 'authors' }]
    }).then(books => { res.render('search', { books: books}) })
      .catch(error => console.error(error))
  },

  deleteBook: (req, res) => {
    // Punto 5: Eliminación de libros
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/')
    },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: async(req, res) => {
    //Punto 3: Libros de un autor
    db.Author.findByPk(req.params.id, {include: [{ association: 'books' }]})
      .then(result =>
      res.render('authorBooks', {books: result.books}))
  .catch((error) => console.log(error))
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Punto 6: Login y logout
    res.render('login');
  },
  processLogin: (req, res) => {
    // Punto 6: Login y logout
    const {email, password} = req.body;
    console.log(email, password);
    db.User.findOne({
      where:{
        email: email
      }
    }).then(user =>
      { if(!user){
          res.render('login', {errors: {email: {msg: 'Este email no ha sido registrado'}}});
          return;
        }
      const validUser = bcryptjs.compareSync(password, user.Pass)
        if(validUser){
          req.session.loggedUser = user;
          res.cookie('loggedUser', email)
          res.redirect('/');
        } else {
          res.render('login', {errors: {password: {msg: 'Contraseña inválida'}}, email: email});
        }
      }
    )
  },
  processLogout: (req, res) => {
    // Punto 6: Login y logout
    res.render('home');
  },
  edit: (req, res) => {
    // Punto 4: Implementar edit de libros
    db.Book.findByPk(req.params.id).then(book => {
      const {id, title, description, cover} = book;
      res.render('editBook', {id, title, description, cover})
    })
  },
  processEdit: (req, res) => {
    // Punto 4: Implementar edit de libros
    const {title, cover, description} = req.body;
    if(title && cover && description) {
      db.Book.update({title, cover, description}, {where:{id: req.params.id}})
      .then(() => db.Book.findAll({include: [{ association: 'authors' }]}))
      .then((books) => res.redirect('/'));
      return;
    }
    let errors = {}
    if(!title){
      errors.title = {msg: "Es necesario que coloques un título"}
    }
    if(!cover){
      errors.cover = {msg: "Por favor, selecciona una imágen para el libro"}
    }
    if(!description){
      errors.description = {msg: "Por favor, escribe una descripción"}
    }
    db.Book.findByPk(req.params.id).then(book => {
      const {id, title, description, cover} = book;
      res.render('editBook', {id, title, description, cover, errors})
    })
  }
};

module.exports = mainController;
