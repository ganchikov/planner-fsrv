// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {    
    //workaround for an issue with context data parser
    
    const propNames = Object.getOwnPropertyNames(context.data);
    if (propNames.length === 1 && propNames[0].includes(':'))  {
      const propName = propNames[0];
      const obj = JSON.parse(propName);
      context.data = obj;
    }
      
    
    
    return context;
  };
};
