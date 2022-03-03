'use strict';

module.exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, 2));
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            },
            null,
            2
        ),
  };

  /*
  {
    "awslogs": {
        "data": "略"
        }
  }
  */
};
