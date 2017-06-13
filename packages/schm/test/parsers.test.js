import { type, set, get, defaultParser } from '../src/parsers'

describe('type', () => {
  test('nil value', () => {
    expect(type(null, String)).toBeNull()
    expect(type(undefined, String)).toBeUndefined()
  })

  test('RegExp', () => {
    expect(type(1, RegExp)).toEqual(/1/i)
    expect(type(1, [RegExp])).toEqual([/1/i])
    expect(type([1, 2], [RegExp])).toEqual([/1/i, /2/i])
  })

  test('Date', () => {
    expect(type(10, Date)).toEqual(new Date(10))
    expect(type('2017', Date)).toEqual(new Date('2017'))
    expect(type('10000', Date)).toEqual(new Date(10000))
    expect(type(10, [Date])).toEqual([new Date(10)])
    expect(type([10, 1], [Date])).toEqual([new Date(10), new Date(1)])
  })

  test('Boolean', () => {
    expect(type(true, Boolean)).toBe(true)
    expect(type(false, Boolean)).toBe(false)
    expect(type(1, Boolean)).toBe(true)
    expect(type(0, Boolean)).toBe(false)
    expect(type('true', Boolean)).toBe(true)
    expect(type('false', Boolean)).toBe(false)
    expect(type('0', Boolean)).toBe(false)
    expect(type(1, [Boolean])).toEqual([true])
    expect(type([1, 'false'], [Boolean])).toEqual([true, false])
  })

  test('Number', () => {
    expect(type(1, Number)).toBe(1)
    expect(type('1', Number)).toBe(1)
    expect(type('1', [Number])).toEqual([1])
    expect(type(['1', 'a'], [Number])).toEqual([1, NaN])
  })

  test('Object', () => {
    expect(type({ foo: 'bar' }, Object)).toEqual({ foo: 'bar' })
    expect(type(1, Object)).toEqual(Object(1))
    expect(type('1', Object)).toEqual(Object('1'))
    expect(type(/ab/, Object)).toEqual(/ab/)
    expect(type({ foo: 'bar' }, [Object])).toEqual([{ foo: 'bar' }])
    expect(type([{ foo: 'bar' }, /ab/], [Object])).toEqual([{ foo: 'bar' }, /ab/])
  })

  test('String', () => {
    expect(type(1, String)).toBe('1')
    expect(type('1', String)).toBe('1')
    expect(type(/ab/, String)).toBe('/ab/')
    expect(type(/ab/, [String])).toEqual(['/ab/'])
    expect(type([1, /ab/], [String])).toEqual(['1', '/ab/'])
  })
})

describe('set', () => {
  it('calls function', () => {
    const fn = jest.fn()
    set('foo', fn)
    expect(fn).toHaveBeenCalledWith('foo')
  })

  it('throws an error', () => {
    expect(() => set('foo', 'bar')).toThrow()
  })
})

describe('get', () => {
  it('calls function', () => {
    const fn = jest.fn()
    get('foo', fn)
    expect(fn).toHaveBeenCalledWith('foo')
  })

  it('throws an error', () => {
    expect(() => get('foo', 'bar')).toThrow()
  })
})

test('defaultParser', () => {
  expect(defaultParser(undefined, 'foo')).toBe('foo')
  expect(defaultParser(null, 'foo')).toBe('foo')
  expect(defaultParser('', 'foo')).toBe('foo')
  expect(defaultParser(NaN, 'foo')).toBe('foo')
  expect(defaultParser(1, 'foo')).toBe(1)
  expect(defaultParser('bar', 'foo')).toBe('bar')
})