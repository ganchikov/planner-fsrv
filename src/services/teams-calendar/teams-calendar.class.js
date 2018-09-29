const {ModelType} = require('@src/constants');
const {CalendarItem} = require('@src/models/calendar-item.model');
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
      const teamItem = new CalendarItem(
        team._id,
        team.id,
        team.name,
        ModelType.team
      );
      result.push(teamItem);

      const members = await this.teamsService._getChildren(team);
    
      for (const person of members) {

        const absences = await this.peopleService._getChildren(person);
        const dates = this.getDatesRange(absences);

        const personItem = new CalendarItem(
          person._id,
          person.id,
          person.name,
          ModelType.person,
          team.id,
          dates.unscheduled,
          dates.start_date,
          dates.end_date,
          absences.map(itm => {
            return {
              id: itm.id,
              start_date: itm.start_date,
              end_date: itm.end_date
            };
          })
        );
        result.push(personItem);

        for (const absence of absences) {
          const absenceItem = new CalendarItem(
            absence._id,
            absence.id,
            absence.name,
            ModelType.absence,
            person.id,
            false,
            absence.start_date,
            absence.end_date
          );
          result.push(absenceItem);
        }
        
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
