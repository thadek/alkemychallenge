'use strict';
const { Movie, Character, Genre} = require('../../app/models/index')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  

    return Promise.all([

    
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
      }),

      Movie.create({
        imageURL: "https://upload.wikimedia.org/wikipedia/en/c/c0/The_Little_Mermaid_%28Official_1989_Film_Poster%29.png",
        title: "The little mermaid",
        creationDate: Date.parse("Nov 17, 1989"),
        GenreId:1,
        rating: 5,
        Characters: [
          {
            imageURL: "https://upload.wikimedia.org/wikipedia/en/7/77/Ariel_disney.png",
            name: "Ariel",
            age: 16,
            weight: 40,
            history: "Ariel is the seventh-born daughter of King Triton and Queen Athena of an underwater kingdom of merfolk called Atlantica.She is often rebellious, and in the first film, she longs to be a part of the human world"
          },{
            imageURL: "https://static.wikia.nocookie.net/disney/images/6/67/George_Banks.jpg/revision/latest/scale-to-width-down/260?cb=20140123203814&path-prefix=es",
            name: "Prince Eric",
            age: 18,
            weight: 64,
            history: "Eric is a human prince rescued by Ariel when he almost drowns in a storm at sea."
          },{
            imageURL: "https://upload.wikimedia.org/wikipedia/en/e/e3/Ursula%28TheLittleMermaid%29character.png",
            name: "Ursula",
            age: 106,
            weight: 80,
            history: "Ursula is a villainous sea witch who offers a mermaid princess named Ariel a temporary opportunity to become human so that she may earn the love of Prince Eric within three days"
          }
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
