const {modelTypeTeam, modelTypePerson, modelTypeAbsence} = require('@src/constants/model-type');
const moment = require('moment');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.teamsService = options.teamsService;
    this.peopleService = options.peopleService;
  }

  async find (params) {
    if (params.query.flat) {
      return this.findFlat(params);
    }
    const teams = await this.teamsService._getTeams();
    for (const team of teams) {
      await this.teamsService._addChildren(team);
      for (const person of team.members) {
        await this.peopleService._addChildren(person);
      }
    }
    return {data: teams};
  }

  async findFlat(params) {
    const result = [];
    const teams = await this.teamsService._getTeams();
    for (const team of teams) {
     
      team.text = team.name;
      team.type = 'task';
      team.open = true;
      team.unscheduled = true;
      team.model_type = modelTypeTeam;
      result.push(team);
      const members = await this.teamsService._getChildren(team);
      members.map(person => {
        person.parent = team.id;
        person.text = person.name;
        return person;
      });
      delete team.members;
      result.push(...members);
      for (const person of members) {
        person.text = person.name;
        person.type = 'task';
        person.open = true; 
        person.absences = [];
        person.model_type = modelTypePerson;
        const absences = await this.peopleService._getChildren(person);

        const dates = this.getDatesRange(absences);
        person.start_date = dates.start_date;
        person.end_date = dates.end_date;
        person.unscheduled = dates.unscheduled;

        result.push(...absences.map(absence => {
          absence.parent = person.id;
          absence.text = absence.name;
          absence.type = 'task';
          absence.model_type = modelTypeAbsence;
          absence.unscheduled = false;
          absence.open = true;
          person.absences.push({
            start_date: absence.start_date,
            end_date: absence.end_date,
          });
          return absence;
        }));
      }
    }
    return {data: result};
  }

  getDatesRange(absences) {
    const result = {
      start_date: new Date(Date.now()),
      end_date: new Date(Date.now()),
      unscheduled: true
    };

    if(!absences || absences.length === 0) {
      return result;
    }

    result.start_date = moment(absences[0].start_date).toDate();
    result.end_date = moment(absences[0].end_date).toDate();

    for (const absence of absences) {
        if (moment(absence.start_date).isBefore(moment(result.start_date))) {
            result.start_date = moment(absence.start_date).toDate();
        }
        if (moment(absence.end_date).isAfter(moment(result.end_date))) {
          result.end_date = moment(absence.end_date).toDate();
      }
    }
    result.unscheduled = false;

    return result;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
