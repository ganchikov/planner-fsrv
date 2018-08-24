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

  async create (teams, params) {
    const promises = [];
    for (const team of teams) {
      promises.push(this.createTeam(team, params));
    }                
    const insTeams = await Promise.all(promises);
    return insTeams;    
  }

  async createTeam(team, params) {
    const teamsService = this.options.teamsService;
    const members = team.members;
    const promises = [];
    for (const person of members) {
      promises.push(this.createPerson(person, params));
    }
    const insMembers = await Promise.all(promises);
    team.members = insMembers.map(item => item._id);
    return await teamsService.create(team, params);
  }

  async createPerson(person, params) {
    const peopleService = this.options.peopleService;    
    const personItem = await peopleService.create(person, params);
    const personId = person._id = personItem._id;
    const absences = person.absences;
    const promises = [];
    for (const absence of absences) {
      absence.person = personId;
      promises.push(this.createAbsence(absence, params));      
    }
    person.absences = await Promise.all(promises);
    return person;
  }

  async createAbsence(absence, params) {
    const absencesService = this.options.absencesService;
    return await absencesService.create(absence, params);    
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
