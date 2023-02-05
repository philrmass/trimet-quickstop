// ??? clean up cache and check it is working
class Cache {
  constructor(maxAge = 1000) {
    this.maxAge = maxAge;
    this.stopsData = {};
    this.stopsQueue = [];
  }

  set(stopId, time, data) {
    this.stopsData[stopId] = data;
    this.stopsQueue = this.stopsQueue.filter((data) => data.stopId !== stopId);
    this.stopsQueue.push({stopId, time});
  }

  get(stopId, time) {
    this.clearOld(time);
    return this.stopsData[stopId];
  }

  clearOld(time) {
    let oldFound = true;
    let oldCount = 0;
    while(oldFound && (this.stopsQueue.length > oldCount)) {
      const age = (time - this.stopsQueue[oldCount].time);
      if(age >= this.maxAge) {
        const oldStopId = this.stopsQueue[oldCount].stopId;
        delete this.stopsData[oldStopId];
        oldCount++;
      } else {
        oldFound = false;
      }
    }
    this.stopsQueue = this.stopsQueue.slice(oldCount);
    return oldCount;
  }
}

export default Cache;
