import mongoose from 'mongoose';

const BusLogSchema = new mongoose.Schema({
  plateId: { type: String, required: true },
  routeId: { type: String, required: true },
  location: [{
    position: {
      lat: { type: Number },
      lng: { type: Number }
    },
  }],
  velocity: { type: Number, default: Math.ceil(Math.random() * Math.random() * 100) },
  direction: { type: String, default: '10s' },
  timeToNextStop:  { type: String, default: '10s' },
  isActive: { type: Boolean, default: true },
  isRunning: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('BusLog', BusLogSchema);
// the above is necessary as you might have embedded schemas which you don't export
