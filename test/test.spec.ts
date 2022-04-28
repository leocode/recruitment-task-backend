import { helloWorld } from '../src'

describe('helloWorld', () => {
  it('should return hello world', () => {
    expect(helloWorld()).toEqual('Hello world!');
  })
})