const statisticsService = require('./statistics.service');

const getIncomeDistribution = (req, res) => {
    return statisticsService.getIncomeDistribution(req.params.userId)
        .then(r => {
            return res.status(200).json(r);
        })
        .catch(error => {
            return res.status(error.code).json({
            code: error.code,
            description: error.description
        })});
};

const getExpenseDistribution = (req, res) => {
    return statisticsService.getExpenseDistribution(req.params.userId)
        .then(r => {
            return res.status(200).json(r);
        })
        .catch(error => {
            return res.status(error.code).json({
            code: error.code,
            description: error.description
        })});
};

module.exports = {
    getIncomeDistribution,
    getExpenseDistribution,
};