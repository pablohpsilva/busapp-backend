import mongoose from 'mongoose';

const BusStopSchema = new mongoose.Schema({
  busStopId: {type: Number, required: true},
  routeId: [{ type: String, uppercase: true }],
  description: { type: String },
  position: {
    latitude:  { type: Number },
    longitude:  { type: Number },
  },
  isStation:  { type: Boolean },
  stationName:  { type: String },
})


export default mongoose.model('BusStop', BusStopSchema);
