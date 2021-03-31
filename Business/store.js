import { Subject } from "rxjs";

class Store {
   constructor() {
      this.id = new Date().getTime();
      this.reducers = [];
      this.effects = [];
      this.state = {};
      this.store$ = new Subject();
   }

   addSubscriber = (subscriber) => {
      return this.store$.subscribe(subscriber);
   };

   removeSubscriber = (subscription) => {
      subscription.unsubscribe();
   }

   addReducer = (name, reducer) => {
      this.reducers[name] = reducer;
   };

   addEffect = (name, effect) => {
      this.effects[name] = effect;
   }

   dispatch = (name, payload = null) => {
      if (this.effects[name]) {         
         const effect = this.effects[name];
         effect(this.state, payload);
      }
      if (this.reducers[name]) {         
         const reducer = this.reducers[name];
         this.state = reducer(this.state, payload);
         this.store$.next(this.state);
      } 
   };
}

const store = new Store();

export default store;



