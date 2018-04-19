/* eslint-disable no-unused-vars */
class Service {
  constructor (options, ) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      await Promise.all(data.map(current => this.createTeam(current)));
    }

    return data;
  }

  async createTeam(data) {
    const teamsService = this.options.teamsService;
    const members = data.members;
    if (members && Array.isArray(members)) {
      data.members = await Promise.all(members.map(current => this.createPerson(current)._id));
    } 
    const team = await teamsService.create(data);
    
    
    return team;
  }

  async createPerson(data) {
    const peopleService = this.options.peopleService;    
    const absences = data.absences;
    if (absences && Array.isArray(absences)) {
      data.absences = await Promise.all(absences.map(current => this.createAbsence(current)._id));
    } 
    const person = await peopleService.create(data);
    return person;   
  }

  async createAbsence(data) {
    const absencesService = this.options.absencesService;
    return await absencesService.create(data);
  }



  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
