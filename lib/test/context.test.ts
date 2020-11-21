import { expect } from 'chai';
import context, { addListener, removeListener } from '../src/index';

describe('context', () => {
  const listeners = [];

  afterEach(() => {
    listeners.forEach(removeListener);
  });

  it('creates context with default value', () => {
    const value = 'hakuna matata';
    const v = context<string>(value);
    expect(v).to.be.a('function');
    expect(v()).to.eql(value);
  });

  it('updates context', (done) => {
    const value = 'hakuna matata';
    const v = context<string>('');

    const finish = () => {
      expect(v()).to.eql(value);
      done();
    }

    v((currentValue: string): string => {
      expect(currentValue).to.eql(v());
      setTimeout(finish, 0);
      return value;
    });
  });

  it('updates listeners', (done) => {
    const value = 'hakuna matata';
    const v = context<string>('');

    addListener(() => done());
    
    v((currentValue: string): string => {
      expect(currentValue).to.eql(v());
      return value;
    });
  });

});
