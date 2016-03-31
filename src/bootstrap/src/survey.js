export default {
  S3: {
    Bucket: 'survey.' + Date.now()
  },
  HIT: {
    Title: 'Survey Title',
    Description: 'Survey description',
    AssignmentDurationInSeconds: 3600,
    LifetimeInSeconds: 3600,
    MaxAssignments: 100,
    Reward: {
      Amount: 0.01,
      CurrencyCode: 'USD'
    }
  },
  queue: [ {
    type: 'Bernoulli'
  }, {
    type: 'Mirror'
  }],
  table : {
    surveyAuthor : 'Survey Author',
    surveyName : 'Survey Name',
    surveyVersion : Date.now()
  }
}