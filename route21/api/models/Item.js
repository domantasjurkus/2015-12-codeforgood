/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    title: {
      type: 'string'
    },

    category: {
      type: 'string',
      enum: [
        'apprenticeship',
        'event',
        'internship',
        'intern',
        'job',
        'advice',
        'other',
      ],
    },

    company: {
      type: 'string'
    },

    link: {
      type: 'string',
      unique: true
    },

    location: {
      type: 'string'
    },

    tags: {
      type: 'array',
    }

  },

};
