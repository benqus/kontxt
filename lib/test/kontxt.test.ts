import { expect } from 'chai';
import { createContext, addListener, removeListener } from '../src/kontxt';

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

  it('sets value', (done) => {
    const value = 'hakuna matata';
    const v = createContext<string>('');
    const l = addListener(() => {
      expect(v()).to.eql(value);
      removeListener(l);
      done();
    })

    v.set(value);
  });

  it('merge partial', (done) => {
    const value = 'hakuna matata';
    const v = createContext<object>({});

    addListener(() => {
      expect(v()).to.eql({ value });
      done();
    });
    
    v.merge({ value });
  });

});
