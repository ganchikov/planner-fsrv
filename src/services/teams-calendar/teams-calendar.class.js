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
      result.push(team);
      const members = await this.teamsService._getChildren(team);
      members.map(itm => {
        itm.parent = team.id;
        itm.text = itm.name;
        return itm;
      });
      team.text = team.name;
      team.type = 'task';
      team.open = true;
      team.unscheduled = true;
      delete team.members;
      result.push(...members);
      for (const person of members) {
        person.text = person.name;
        person.type = 'task';
        person.open = true; 
        person.unscheduled = false;
        const absences = await this.peopleService._getChildren(person);
        result.push(...absences.map(itm => {
          itm.parent = person.id;
          itm.text = itm.name;
          itm.type = 'task';
          itm.unscheduled = false;
          itm.open = true;
          return itm;
        }));
      }
    }
    return {data: result};
  }

  async get (id, params) {
    

    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return await Promise.all(data.map(current => this.create(current)));
    }

    return data;
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
