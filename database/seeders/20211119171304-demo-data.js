'use strict';

const { Movie, Character, Genre, Role, User} = require('../../app/models/index')
const encryptionService = require('../../app/services/encryptionService')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  

    return Promise.all([

      User.create({
        name:"admin",
        email:"admin@alkemy.org",
        password:encryptionService.encryptPass('123456'),
        Roles:[{name:"admin"}]
      },{include:[Role]}),

      Role.bulkCreate([{
         name:"user"}]),

      Genre.bulkCreate([{
        imageURL:"https://i0.wp.com/danielle-adams.com/wp-content/uploads/2018/03/fantasy_world.jpg?fit=1140%2C500&ssl=1",
        name:"Fantasy"
      },
      {
        imageURL:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Treble_a.svg/1200px-Treble_a.svg.png",
        name:"Musical"
      },
      {
        imageURL:"https://s3.amazonaws.com/heights-photos/wp-content/uploads/2017/04/04191317/isabella-column-online-640x360.jpg",
        name:"Action"
      },
      {
        imageURL:"https://algo.com/asd.jpg",
        name:"Adventure"
      }
    ]),
 
      Movie.create({
      imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mary_Poppins6.jpg/300px-Mary_Poppins6.jpg",
      title: "Mary Poppins",
      creationDate: Date.parse("Aug 27, 1984"),
      GenreId:1,
      rating: 4,
      Characters: [
        {
          imageURL: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Mary_Poppins5.jpg",
          name: "Mary Poppins",
          age: 20,
          weight: 60,
          history: "A magical English nanny, she blows in on the east wind and arrives at the Banks home at Number 17 Cherry Tree Lane, London, where she is given charge of the Banks children and teaches them valuable lessons with a magical touch.Travers gives Poppins the accent and vocabulary of a real London nanny: cockney base notes overlaid with a strangled gentility."
        },{
          imageURL: "https://static.wikia.nocookie.net/disney/images/6/67/George_Banks.jpg/revision/latest/scale-to-width-down/260?cb=20140123203814&path-prefix=es",
          name: "George Banks",
          age: 22,
          weight: 54,
          history: "Mary Poppins' employer and father of Jane and Michael. He works at the Dawes Tomes Mousley Grubbs Fidelity Fiduciary Bank in London. He is a driven and disciplined man."
        },
      ]
      },
      {
        include:[Character]
      })

    ]);
    
    

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
