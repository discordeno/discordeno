import { expect } from 'chai'
import { convertRestError } from '../src/convertRestError.js'

describe('[rest] convertRestError', () => {
  it('Should contain important info', () => {
    const convertedError = convertRestError(new Error(), {
      status: 404,
      error: 'error message',
      body: 'error body',
      ok: false
    })
    expect(convertedError.message).to.be.include('404')
    expect(convertedError.message).to.be.include('error message')
    expect(convertedError.message).to.be.include('error body')
  })
})
