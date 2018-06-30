module.exports = (req, res, next) => {
    req.feathers = {
        ...req.feathers,
        headers: req.headers,
        origin: req.get('origin')
      };
    next();    
};
  