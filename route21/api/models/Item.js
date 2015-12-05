/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    category: {
      type: 'string',
      enum: [
        'event',
        'internship',
        'job',
        'advice',
        'other',
      ],
    },

    title: {
      type: 'string'
    }, 

    link: {
      type: 'string',
    },

    tag: {
      type: 'array',
    }

  },

};
