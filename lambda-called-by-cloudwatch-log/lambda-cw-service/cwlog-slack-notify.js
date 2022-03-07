'use strict';

const aws = require('aws-sdk')
const zlib = require('zlib');

module.exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, 2));
    /*
    const promise = new Promise(function(resolve, reject) {
        // https://stackoverflow.com/questions/62033425/cant-get-amazon-cloudwatch-logs-from-lambda-by-node-js
        const cloudwatchlogs = new aws.CloudWatchLogs();
        const params = {
            logGroupName: '/aws/lambda/slack-notify'
        }
        cloudwatchlogs.describeLogStreams(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
    })
    */
   // https://gist.github.com/aflansburg/132ef45a5ad9006469d8286bb99a0ec5
    const payload     = Buffer.from(event.awslogs.data, 'base64');
    const unzipeddata = zlib.unzipSync(payload);  
    const logdata     = JSON.parse(unzipeddata.toString('utf8'));        
    const logs        = JSON.stringify(logdata,null,2);
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: logs,
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
