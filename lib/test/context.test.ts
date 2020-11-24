import { expect } from 'chai';
import { createContext, addListener, removeListener } from '../src/index';

describe('context', () => {
  const listeners = [];

  afterEach(() => {
    listeners.forEach(removeListener);
  });

  it('creates context with default value', () => {
    const value = 'hakuna matata';
    const v = createContext<string>(value);
    expect(v).to.be.a('function');
    expect(v()).to.eql(value);
  });

  it('updates context', (done) => {
    const value = 'hakuna matata';
    const v = createContext<string>('');
    const l = addListener(() => {
      expect(v()).to.eql(value);
      removeListener(l);
      done();
    })

    v((currentValue: string): string => {
      expect(currentValue).to.eql(v());
      return value;
    });
  });

  it('updates listeners', (done) => {
    const value = 'hakuna matata';
    const v = createContext<string>('');

    addListener(() => done());
    
    v((currentValue: string): string => {
      expect(currentValue).to.eql(v());
      return value;
    });
  });

});
