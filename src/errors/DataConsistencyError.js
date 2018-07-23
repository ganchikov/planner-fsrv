class DataConsistencyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataConsistencyError';
  }
}

module.exports = DataConsistencyError;
