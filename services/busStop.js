import R from 'ramda';
import BusStop from '../schemas/busStop';

const errorHandler = (stops, err, res) => {
  if (!err) {
    return res.json(stops);
  }
  throw err;
}

export const saveStops = (payload, res) => {
  R.forEach((el) => {
    const stop = new BusStop(el);
    stop.save(err => {
      if (err) throw err;
    });
  }, payload);
};

export const fetchStopsByRoute = (routeId, success) => {
  return BusStop.find({ routeId: { "$in": [routeId] } }, (err, stops) => {
    errorHandler(stops, err, success);
  });
}

export const fetchStopById = (stopId, success) => {
  return BusStop.find({ busStopId: stopId }, (err, stops) => {
    errorHandler(stops, err, success);
  });
}

export default {
  register(Router) {
    Router.get('/busstop/:id', ({ params: { id } }, res) => {

      fetchStopsByRoute(id.toString().toUpperCase(), res);
    });

    Router.post('/busstop', ({ body }, res) => {
      if (R.is(Array, body)) {
        saveStops(body, res);
        return res.json(body);
      }
      return res.json({message: 'Error!'});
    });
  }
};
