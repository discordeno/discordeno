import { expect } from 'chai'
import { describe, it } from 'mocha'
import { EmbedsBuilder } from '../src/builders.js'

describe('builders/embeds.ts', () => {
  it('should create a new blank embed JSON', () => {
    expect(new EmbedsBuilder().newEmbed()).to.eql([{}])
  })

  /*
  it('should set the  in the embed JSON', () => {
    expect(new EmbedsBuilder()).to.eql([{}])
  })
  */
 
  it('should set the author name in the embed JSON', () => {
    expect(new EmbedsBuilder().setAuthor('Author')).to.eql([{ author: { name: 'Author'}}])
  })

  it('should set the color in the embed JSON', () => {
    expect(new EmbedsBuilder().setColor('#000000')).to.eql([{ color: 0 }])
    expect(new EmbedsBuilder().setColor('#21fa99')).to.eql([ { color: 2226841 }])
    expect(new EmbedsBuilder().setColor('#thisisnotacolor')).to.eql([{ color: 0 }])
    expect(new EmbedsBuilder().setColor(13530)).to.eql([{ color: 13530 }])
  })

  it('should set the title in the embed JSON', () => {
    expect(new EmbedsBuilder().setTitle('My Title')).to.eql([{ title: 'My Title'}])
  })

  it('should set the description in the embed JSON', () => {
    expect(new EmbedsBuilder().setDescription('My Description')).to.eql([{ description: 'My Description'}])
  })
})