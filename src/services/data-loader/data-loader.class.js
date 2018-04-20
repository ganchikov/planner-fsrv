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
    for (const i in teams) {
      let team = teams[i];
      promises.push(this.createTeam(team));
    }                
    const insTeams = await Promise.all(promises);
    return insTeams;    
  }

  async createTeam(team) {
    const teamsService = this.options.teamsService;
    const members = team.members;
    const promises = [];
    for (const i in members) {
      let person = members[i];
      promises.push(this.createPerson(person));
    }
    const insMembers = await Promise.all(promises);
    team.members = insMembers.map(item => item._id);
    return await teamsService.create(team);
  }

  async createPerson(person) {
    const peopleService = this.options.peopleService;    
    const absences = person.absences;
    const promises = [];
    for (const i in absences) {
      let absence = absences[i];
      promises.push(this.createAbsence(absence));      
    }
    const insAbsences = await Promise.all(promises);
    person.absences = insAbsences.map(item => item._id);
    return await peopleService.create(person);
  }

  async createAbsence(absence) {
    const absencesService = this.options.absencesService;
    return await absencesService.create(absence);    
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
