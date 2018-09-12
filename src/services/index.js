const teams = require('./teams/teams.service.js');
const idgenerator = require('./idgenerator/idgenerator.service.js');
const absences = require('./absences/absences.service.js');
const people = require('./people/people.service.js');
const dataLoader = require('./data-loader/data-loader.service.js');
const users = require('./users/users.service.js');
const appver = require('./appver/appver.service.js');

const workspace = require('./workspace/workspace.service.js');

const projects = require('./projects/projects.service.js');

const tasks = require('./tasks/tasks.service.js');

const authenticate = require('./authenticate/authenticate.service.js');

const teamsCalendar = require('./teams-calendar/teams-calendar.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(teams);
  app.configure(idgenerator);
  app.configure(absences);
  app.configure(people);
  app.configure(dataLoader);
  app.configure(users);
  app.configure(appver);
  app.configure(workspace);
  app.configure(projects);
  app.configure(tasks);
  app.configure(authenticate);
  app.configure(teamsCalendar);
};
