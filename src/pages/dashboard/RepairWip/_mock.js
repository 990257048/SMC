export default {
    'POST  /repair-wip/test/': (req, res) => {
    //   console.log(req);
      setTimeout(() => {
        res.send({
            message: 'response Success',
        });
      }, req.body.delay);
    },
    'GET /repair-wip/test1': (req, res) => {
        setTimeout(() => {
            res.send({
                message: 'response Success',
            });
        }, req.query.delay);
    } 
  };
  