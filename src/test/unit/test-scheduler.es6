import r from 'ramda';
import { expect, assert } from 'chai';
import { Queue } from '../../lib/Queue';
import { Scheduler } from '../../lib/Scheduler';

var log = msg => console.log(msg);

describe('Scheduler',function(done){
    it('lets user manually process next tick',function(){
        let q = new Queue();
        q.enqueue(1);
        q.enqueue(2);
        let count = 0;
        let s = new Scheduler(

            process.nextTick,

            _ => { return q.dequeue() },

            num => {
                count++;
            });

        expect(q.length).to.equal(2);
        s.processNext();
        expect(count).to.equal(1);
        expect(q.length).to.equal(1);
        s.processNext();
        expect(count).to.equal(2);
        expect(q.length).to.equal(0);

        //if we keep on going, it just does nothing
        s.processNext();
        expect(count).to.equal(2);
        expect(q.length).to.equal(0);
    });
});
