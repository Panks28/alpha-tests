const {processData} = require('./beta-processor');

const portfolioData = require('../data/case-beta/data-from-api.json');
const tableData = require('../data/case-beta/processed-data.json');

describe('Better Data Processing', () => {

  it('Length to Match with Saved Data', () => {
    const processedData = processData(portfolioData);
    expect(processedData.length).toBe(tableData.length);
  });

  it('Props to be Same for First Objects', () => {
    const processedData = processData(portfolioData);
    expect(Object.keys(processedData['records'][0])).toMatchObject(Object.keys(tableData['records'][0]));
  });

  it('Data to Match', () => {
    const processedData = processData(portfolioData);
    expect(processedData).toMatchObject(tableData);
  });
});
