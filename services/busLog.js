import R from 'ramda';
import BusLog from '../schemas/busLog';

const errorHandler = (stops, err, res) => {
  if (!err) {
    return res.json(stops);
  }
  throw err;
}

export const fetchBusByRoute = (routeId, success) => {
  return BusLog.find({ routeId }, (err, stops) => {
    errorHandler(stops, err, success);
  });
}

export const saveBusLog = (payload, res) => {
  if (R.is(Array, payload)) {
    R.forEach((el) => {
      const bus = new BusLog(el);
      bus.save(err => {
        if (err) throw err;
      });
    }, payload);
  }
};

export default {
  register(Router) {
    Router.post('/buslog', ({ body }, res) => {
      if (R.is(Array, body)) {
        saveBusLog(body, res);
        return res.json(body);
      }
      return res.json({message: 'Error!'});
    });

    Router.get('/buslog/:id', ({ params: { id } }, res) => {
      fetchBusByRoute(id.toString().toUpperCase(), res);
    });
  }
};
