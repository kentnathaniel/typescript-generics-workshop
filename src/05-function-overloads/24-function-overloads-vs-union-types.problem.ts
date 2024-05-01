import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

function runGenerator2(generator: () => string): string
function runGenerator2(generator: { run: () => string }): string
function runGenerator2(
  generator: { run: () => string } | (() => string)
): string {
  if (typeof generator === 'function') {
    return generator()
  }
  return generator.run()
}

function runGenerator<TResult>(
  generator: { run: () => TResult } | (() => TResult)
) {
  if (typeof generator === 'function') {
    return generator()
  }
  return generator.run()
}

it('Should accept an object where the generator is a function', () => {
  const result = runGenerator({
    run: () => 'hello',
  })

  expect(result).toBe('hello')

  type test1 = Expect<Equal<typeof result, string>>
})

it('Should accept an object where the generator is a function', () => {
  const result = runGenerator(() => 'hello')

  expect(result).toBe('hello')

  type test1 = Expect<Equal<typeof result, string>>
})
